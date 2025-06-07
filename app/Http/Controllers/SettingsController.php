<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SettingsController extends Controller
{
    /**
     * Update multiple settings at once
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateSettings(Request $request)
    {
        try {
            $settings = $request->all();
            
            foreach ($settings as $key => $value) {
                // Skip the _token field and any other non-setting fields
                if (in_array($key, ['_token', '_method'])) {
                    continue;
                }
                
                // Determine setting type based on value
                $type = 'string';
                if (is_bool($value)) {
                    $type = 'boolean';
                } elseif (is_integer($value)) {
                    $type = 'integer';
                } elseif (is_float($value)) {
                    $type = 'float';
                } elseif (is_array($value)) {
                    $type = 'array';
                    $value = json_encode($value);
                }
                
                // Set the setting
                $group = $this->determineGroup($key);
                Setting::set($key, $value, $group, $type);
            }
            
            return response()->json(['success' => true, 'message' => 'Settings updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update settings: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Determine the group of a setting based on its key
     *
     * @param string $key
     * @return string
     */
    private function determineGroup($key)
    {
        if (strpos($key, 'fee_') === 0 || strpos($key, 'commission_') === 0 || strpos($key, 'withdraw_') === 0) {
            return 'fee';
        }
        
        if (strpos($key, 'password_') === 0 || strpos($key, 'security_') === 0) {
            return 'security';
        }
        
        if (strpos($key, 'payment_') === 0 || strpos($key, 'midtrans_') === 0 || strpos($key, 'qris_') === 0) {
            return 'payment';
        }
        
        return 'general';
    }
}
