<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AISearchController extends Controller
{    public function search(Request $request)
    {
        $query = $request->input('query', '');
        $filters = $request->input('filters', []);
        $initialData = $request->input('initialData', []);
        
        // Log the search query for debugging
        Log::info('AI Search Query: ' . $query);
        Log::info('AI Search Filters: ' . json_encode($filters));
        
        // Construct the prompt for Groq
        $prompt = $this->constructPrompt($query, $filters, $initialData);
        
        try {
            // Force reload of environment variables
            if (file_exists(app()->environmentFilePath())) {
                $dotenv = \Dotenv\Dotenv::createImmutable(base_path());
                $dotenv->load();
            }
            
            $response = $this->callGroqAPI($prompt);
            
            // Parse the response to extract relevant IDs
            $parsedIds = $this->parseResponseForIds($response);
            
            Log::info('AI Search Parsed IDs: ' . json_encode($parsedIds));
            
            // If no IDs were found, perform a fallback search
            if (empty($parsedIds)) {
                Log::info('AI Search returned no results, attempting fallback search');
                $parsedIds = $this->fallbackSearch($query, $initialData);
            }
            
            // Fetch the actual records based on the IDs
            $results = $this->fetchResultsFromDatabase($parsedIds);
            
            return response()->json([
                'success' => true,
                'results' => $results
            ]);
        } catch (\Exception $e) {
            Log::error('AI Search Error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat melakukan pencarian: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Perform a fallback search when AI returns no results
     * 
     * @param string $query The search query
     * @param array $initialData The initial data
     * @return array Array of IDs
     */
    private function fallbackSearch($query, $initialData)
    {
        // Split the query into keywords
        $keywords = preg_split('/\s+/', $query);
        $resultIds = [];
        
        // Search for each keyword separately in the initialData
        foreach ($initialData as $item) {
            $matched = false;
            foreach ($keywords as $keyword) {
                // Skip short keywords (less than 3 characters)
                if (strlen($keyword) < 3) continue;
                
                // Check if the keyword is in title or description
                if (stripos($item['title'] ?? '', $keyword) !== false || 
                    stripos($item['description'] ?? '', $keyword) !== false) {
                    $matched = true;
                    break;
                }
            }
            
            if ($matched) {
                $resultIds[] = $item['id'];
            }
        }
        
        return $resultIds;
    }
    
    private function constructPrompt($query, $filters, $initialData)
    {
        // Format filter information
        $filterText = '';
        
        if (!empty($filters['kategori'])) {
            $filterText .= "Kategori: {$filters['kategori']}, ";
        }
        
        if (!empty($filters['harga'])) {
            $filterText .= "Rentang Harga: {$filters['harga']}, ";
        }
        
        if (!empty($filters['rating'])) {
            $filterText .= "Rating Minimal: {$filters['rating']}, ";
        }
          // Format initial data to be sent to Groq
        $dataText = json_encode($initialData);
        
        // The full prompt
        return <<<EOT
        Berikut adalah data dari halaman eksplorasi yang menampilkan layanan atau jasa:
        $dataText
        
        Berdasarkan data tersebut, cari item yang relevan dengan keyword berikut: "$query"
        Filter tambahan: $filterText
        
        Penting: Perhatikan bahwa query dapat mengandung beberapa konsep sekaligus (seperti "ios dan laravel" atau "desain logo dan aplikasi mobile"). Pastikan untuk mencari semua item yang berkaitan dengan konsep-konsep tersebut, bukan hanya yang mengandung semua kata kunci secara bersamaan.
        
        Analisis setiap item dengan seksama dan periksa apakah item tersebut berkaitan dengan konsep-konsep dalam query, meskipun tidak mengandung kata kunci yang persis sama.
        
        Format response-mu harus berupa array JSON dari ID-ID yang relevan saja, seperti:
        {"relevantIds": [1, 5, 10, 15, 22]}
        
        Hanya berikan ID dari item yang paling relevan dengan pencarian tanpa penjelasan tambahan.
        EOT;
    }
      private function callGroqAPI($prompt)
    {
        // Try multiple ways to get the API key
        $apiKey = env('GROQ_ENV_API');
        
        // If not found, try config
        if (!$apiKey) {
            $apiKey = config('services.groq.api_key');
        }
        
        // If still not found, try a direct .env read
        if (!$apiKey) {
            try {
                $envFile = file_get_contents(base_path('.env'));
                preg_match('/GROQ_ENV_API=([^\s]+)/', $envFile, $matches);
                if (isset($matches[1])) {
                    $apiKey = trim($matches[1]);
                }
            } catch (\Exception $e) {
                // Ignore file reading errors
            }
        }
        
        // Log API key status for debugging (only show if available or not, don't log the actual key)
        Log::info('GROQ API Key status: ' . ($apiKey ? 'Available' : 'Missing'));
          if (!$apiKey) {
            throw new \Exception('GROQ API Key is missing. Please check your .env file.');
        }
        
        // If we're in debug mode and the key is obviously a placeholder, use a hardcoded one for testing
        if (config('app.debug') && $apiKey == 'your_groq_api_key_here') {
            $apiKey = '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';
        }
        
        $endpoint = 'https://api.groq.com/openai/v1/chat/completions';
        
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer $apiKey",
                'Content-Type' => 'application/json'
            ])->timeout(30)->post($endpoint, [                'model' => 'llama3-8b-8192',  // Atau model lain yang tersedia di Groq
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Kamu adalah asisten AI yang membantu mencari konten berdasarkan kata kunci. Kamu harus menganalisis permintaan pencarian dengan cermat, terutama jika mengandung beberapa konsep (seperti "ios dan laravel" atau "desain logo dan aplikasi"). Untuk query yang mengandung beberapa konsep, cari item yang berkaitan dengan salah satu atau lebih konsep tersebut, tidak harus mengandung semua konsep sekaligus. Kembalikan ID-ID yang relevan dalam format JSON.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'temperature' => 0.5  // Higher temperature for more creative matching
            ]);
            
            if ($response->failed()) {
                $statusCode = $response->status();
                $errorMessage = $response->body();
                
                Log::error("Groq API Error (Status $statusCode): $errorMessage");
                
                if ($statusCode === 401) {
                    throw new \Exception('Invalid API key. Please check your GROQ_ENV_API in .env file.');
                } elseif ($statusCode === 429) {
                    throw new \Exception('Rate limit exceeded. Please try again later.');
                } else {
                    throw new \Exception("Groq API Error (Status $statusCode): $errorMessage");
                }
            }
            
            return $response->json();
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            throw new \Exception('Connection to Groq API failed. Please check your internet connection.');
        } catch (\Exception $e) {
            throw new \Exception('Groq API Error: ' . $e->getMessage());
        }
    }
      private function parseResponseForIds($response)
    {
        // Extract the response content
        $content = $response['choices'][0]['message']['content'] ?? '';
        
        Log::info('AI Response: ' . $content);
        
        // Try to extract JSON from the response
        preg_match('/\{.*\}/s', $content, $matches);
        
        if (empty($matches)) {
            // If no JSON found, try to extract an array of IDs directly
            preg_match('/\[.*\]/s', $content, $array_matches);
            
            if (empty($array_matches)) {
                throw new \Exception('Failed to extract JSON from AI response');
            }
            
            // Create a JSON object with the array
            $jsonStr = '{"relevantIds": ' . $array_matches[0] . '}';
            $data = json_decode($jsonStr, true);
        } else {
            $jsonStr = $matches[0];
            $data = json_decode($jsonStr, true);
            
            // If the JSON doesn't have relevantIds key but has another key with an array value
            if (!isset($data['relevantIds']) && !empty($data)) {
                $array_keys = array_keys($data);
                $first_key = $array_keys[0];
                
                // If the value is an array, use it as relevantIds
                if (isset($data[$first_key]) && is_array($data[$first_key])) {
                    $data['relevantIds'] = $data[$first_key];
                }
            }
        }
        
        if (json_last_error() !== JSON_ERROR_NONE || !isset($data['relevantIds'])) {
            // Handle failure to parse, try to extract IDs manually
            preg_match_all('/\d+/', $content, $id_matches);
            
            if (!empty($id_matches[0])) {
                return array_map('intval', array_unique($id_matches[0]));
            }
            
            throw new \Exception('Invalid JSON format in AI response: ' . json_last_error_msg());
        }
        
        return $data['relevantIds'];
    }
      private function fetchResultsFromDatabase(array $ids)
    {
        // Log the IDs for debugging
        Log::info('Fetching results for IDs: ' . json_encode($ids));
        
        // Make sure we have at least some IDs
        if (empty($ids)) {
            return collect([]);
        }
        
        // Sesuaikan dengan model data Anda
        // Contoh implementasi dengan model Service:
        if (class_exists('\App\Models\Service')) {
            return \App\Models\Service::whereIn('id', $ids)->get();
        }
        
        // Contoh implementasi dengan model Project:
        if (class_exists('\App\Models\Project')) {
            return \App\Models\Project::whereIn('id', $ids)->get();
        }
        
        // Jika tidak ada model yang sesuai, gunakan mock data untuk testing
        $mockData = collect($ids)->map(function($id) {
            return [
                'id' => $id,
                'title' => "Service #$id",
                'description' => "This is a description for service #$id",
                'price' => rand(100000, 5000000),
                'rating' => rand(1, 5),
                'reviews' => rand(1, 100),
                'image' => "https://picsum.photos/seed/$id/300/200"
            ];
        });
        
        return $mockData;
    }
}
