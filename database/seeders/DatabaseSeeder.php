<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Category;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Service;
use App\Models\ServicePackage;
use App\Models\ServiceRequirement;
use App\Models\ServiceFaq;

use App\Models\ServiceGallery;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call other seeders
        $this->call([
            UsersSeeder::class,
            SettingsSeeder::class,
            PaymentSettingsSeeder::class,
        ]);
        
        
        // Get admin user
        $admin = User::where('email', 'admin@mahabisa.com')->first();
        
        // Create admin profile if it doesn't exist yet
        if ($admin && !UserProfile::where('user_id', $admin->id)->exists()) {
            UserProfile::create([
                'user_id' => $admin->id,
                'bio' => 'Platform administrator for MahaBisa',
                'phone_number' => '+6281234567890',
                'address' => 'Jl. Admin No. 1',
                'city' => 'Jakarta',
                'province' => 'DKI Jakarta',
                'is_verified' => true,
            ]);
        }
        
        // Create freelancer users
        $freelancer1 = User::updateOrCreate(
            ['email' => 'siti.rahayu@example.com'],
            [
                'name' => 'Siti Rahayu',
                'password' => Hash::make('password123'),
                'role' => 'freelancer',
                'profile_photo_url' => 'https://randomuser.me/api/portraits/women/44.jpg',
            ]
        );
        
        $freelancer2 = User::updateOrCreate(
            ['email' => 'joko@example.com'],
            [
                'name' => 'Joko Widodo',
                'password' => Hash::make('password123'),
                'role' => 'freelancer',
                'profile_photo_url' => 'https://randomuser.me/api/portraits/men/22.jpg',
            ]
        );
        
        // Create client users
        $client1 = User::updateOrCreate(
            ['email' => 'ahmad@example.com'],
            [
                'name' => 'Ahmad Santoso',
                'password' => Hash::make('password123'),
                'role' => 'client',
                'profile_photo_url' => 'https://randomuser.me/api/portraits/men/32.jpg',
            ]
        );
        
        $client2 = User::updateOrCreate(
            ['email' => 'dewi@example.com'],
            [
                'name' => 'Dewi Susanti',
                'password' => Hash::make('password123'),
                'role' => 'client',
                'profile_photo_url' => 'https://randomuser.me/api/portraits/women/29.jpg',
            ]
        );
        
        // Create profiles for freelancers and clients
        UserProfile::updateOrCreate(
            ['user_id' => $freelancer1->id],
            [
                'bio' => 'Web designer and developer with 5 years of experience',
                'phone_number' => '+6287654321098',
                'address' => 'Jl. Merdeka No. 17',
                'city' => 'Bandung',
                'province' => 'Jawa Barat',
                'website' => 'https://sitirahayu.com',
                'social_media_links' => json_encode([
                    'twitter' => 'sitirahayu'
                ]),
                'is_verified' => true,
            ]
        );
        
        UserProfile::updateOrCreate(
            ['user_id' => $freelancer2->id],
            [
                'bio' => 'Full-stack developer specializing in React and Laravel',
                'phone_number' => '+6281122334455',
                'address' => 'Jl. Pahlawan No. 45',
                'city' => 'Surabaya',
                'province' => 'Jawa Timur',
                'website' => 'https://jokowidodo.com',
                'social_media_links' => json_encode([
                    'github' => 'jokowidodo'
                ]),
                'is_verified' => true,
            ]
        );
        
        UserProfile::updateOrCreate(
            ['user_id' => $client1->id],
            [
                'bio' => 'Startup founder looking for talented developers',
                'phone_number' => '+6289988776655',
                'address' => 'Jl. Sudirman No. 123',
                'city' => 'Jakarta',
                'province' => 'DKI Jakarta',
                'is_verified' => true,
            ]
        );
        
        UserProfile::updateOrCreate(
            ['user_id' => $client2->id],
            [
                'bio' => 'Digital marketing specialist and business owner',
                'phone_number' => '+6282233445566',
                'address' => 'Jl. Gajah Mada No. 56',
                'city' => 'Yogyakarta',
                'province' => 'DI Yogyakarta',
                'is_verified' => true,
            ]
        );
        
        // Create categories
        $categoryWeb = Category::firstOrCreate(
            ['name' => 'Web Development'],
            ['image_url' => 'storage\\category\\web.png']
        );
        $categoryMobile = Category::firstOrCreate(
            ['name' => 'Mobile App Development'],
            ['image_url' => 'storage\\category\\web.png']
        );
        $categoryDesign = Category::firstOrCreate(
            ['name' => 'Design'],
            ['image_url' => 'storage\\category\\web.png']
        );
        $categoryWriting = Category::firstOrCreate(
            ['name' => 'Content Writing'],
            ['image_url' => 'storage\\category\\web.png']
        );
        $categoryMarketing = Category::firstOrCreate(
            ['name' => 'Digital Marketing'],
            ['image_url' => 'storage\\category\\web.png']
        );
        $categoryVideo = Category::firstOrCreate(
            ['name' => 'Video & Animation'],
            ['image_url' => 'storage\\category\\web.png']
        );
        $categoryMusic = Category::firstOrCreate(
            ['name' => 'Music & Audio'],
            ['image_url' => 'storage\\category\\web.png']
        );
        $categoryBusiness = Category::firstOrCreate(
            ['name' => 'Business'],
            ['image_url' => 'storage\\category\\web.png']
        );
        
        // Create skills
        $skills = [
            // Web Development
            ['name' => 'HTML', 'category_id' => $categoryWeb->id],
            ['name' => 'CSS', 'category_id' => $categoryWeb->id],
            ['name' => 'JavaScript', 'category_id' => $categoryWeb->id],
            ['name' => 'PHP', 'category_id' => $categoryWeb->id],
            ['name' => 'Laravel', 'category_id' => $categoryWeb->id],
            ['name' => 'React', 'category_id' => $categoryWeb->id],
            ['name' => 'Vue.js', 'category_id' => $categoryWeb->id],
            ['name' => 'Node.js', 'category_id' => $categoryWeb->id],
            
            // Mobile Development
            ['name' => 'Android', 'category_id' => $categoryMobile->id],
            ['name' => 'iOS', 'category_id' => $categoryMobile->id],
            ['name' => 'React Native', 'category_id' => $categoryMobile->id],
            ['name' => 'Flutter', 'category_id' => $categoryMobile->id],
            ['name' => 'Swift', 'category_id' => $categoryMobile->id],
            ['name' => 'Kotlin', 'category_id' => $categoryMobile->id],
            
            // Design
            ['name' => 'UI Design', 'category_id' => $categoryDesign->id],
            ['name' => 'UX Design', 'category_id' => $categoryDesign->id],
            ['name' => 'Graphic Design', 'category_id' => $categoryDesign->id],
            ['name' => 'Logo Design', 'category_id' => $categoryDesign->id],
            ['name' => 'Illustration', 'category_id' => $categoryDesign->id],
            
            // Writing
            ['name' => 'Content Writing', 'category_id' => $categoryWriting->id],
            ['name' => 'Copywriting', 'category_id' => $categoryWriting->id],
            ['name' => 'Blog Writing', 'category_id' => $categoryWriting->id],
            ['name' => 'Technical Writing', 'category_id' => $categoryWriting->id],
        ];
        
        foreach ($skills as $skill) {
            Skill::firstOrCreate($skill);
        }
        
        // Create projects
        Project::updateOrCreate(
            [
                'user_id' => $client1->id,
                'title' => 'Create a Modern E-commerce Website'
            ],
            [
                'description' => 'Looking for a developer to create a responsive e-commerce website using Laravel and Vue.js. The site will have product listings, shopping cart, checkout, and payment integration.',
                'min_budget' => 2000000,
                'max_budget' => 5000000,
                'budget_type' => 'range',
                'duration' => 30,
                'category_id' => $categoryWeb->id,
                'status' => 'open',
                'skills_required' => json_encode(['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'Vue.js']),
            ]
        );
        
        Project::updateOrCreate(
            [
                'user_id' => $client2->id,
                'title' => 'Mobile App for Food Delivery'
            ],
            [
                'description' => 'Need a mobile app developer to create a food delivery app for Android and iOS. The app should have user registration, restaurant listings, order placement, payment, and order tracking.',
                'min_budget' => 5000000,
                'max_budget' => 10000000,
                'budget_type' => 'range',
                'duration' => 60,
                'category_id' => $categoryMobile->id,
                'status' => 'open',
                'skills_required' => json_encode(['Android', 'iOS', 'React Native', 'Flutter']),
            ]
        );
        
        Project::updateOrCreate(
            [
                'user_id' => $client1->id,
                'title' => 'Company Logo and Brand Identity'
            ],
            [
                'description' => 'Looking for a designer to create a logo and brand identity for a tech startup. The designer should provide logo in various formats, color palette, typography, and usage guidelines.',
                'min_budget' => 1000000,
                'max_budget' => 3000000,
                'budget_type' => 'range',
                'duration' => 15,
                'category_id' => $categoryDesign->id,
                'status' => 'open',
                'skills_required' => json_encode(['UI Design', 'Graphic Design', 'Logo Design']),
            ]
        );
        
        // Create services
        $webService = Service::updateOrCreate(
            [
                'user_id' => $freelancer1->id,
                'title' => 'I will develop a responsive website using Laravel'
            ],
            [
                'description' => 'I will create a custom, responsive website using Laravel framework. The website will be mobile-friendly, fast, and secure.',
                'price' => 2000000,
                'price_type' => 'fixed',
                'delivery_time' => 10,
                'revisions' => 2,
                'category_id' => $categoryWeb->id,
                'thumbnail' => 'storage\services\1y6EeS9jX2P4cRsMOqWX5HJHT4bs4dFsClSGjvFE.png',
                'is_active' => true,
            ]
        );
        
        // Add service packages for web development service
        ServicePackage::updateOrCreate(
            [
                'service_id' => $webService->id,
                'title' => 'Paket Basic'
            ],
            [
                'price' => 2000000,
                'delivery_time' => 10,
                'revisions' => 2,
                'features' => json_encode(['Website 5 halaman', 'Responsive design', 'Contact form', 'Basic SEO', '1 bulan support'])
            ]
        );
        
        ServicePackage::updateOrCreate(
            [
                'service_id' => $webService->id,
                'title' => 'Paket Business'
            ],
            [
                'price' => 3500000,
                'delivery_time' => 14,
                'revisions' => 3,
                'features' => json_encode(['Website 10 halaman', 'Responsive design', 'Contact form', 'Advanced SEO', 'Blog/News section', 'Admin panel', '3 bulan support'])
            ]
        );
        
        ServicePackage::updateOrCreate(
            [
                'service_id' => $webService->id,
                'title' => 'Paket E-Commerce'
            ],
            [
                'price' => 5000000,
                'delivery_time' => 21,
                'revisions' => 4,
                'features' => json_encode(['Website unlimited halaman', 'Responsive design', 'Product catalog', 'Shopping cart & checkout', 'Payment gateway integration', 'Admin dashboard', 'Order management', '6 bulan support'])
            ]
        );
        
        // Add requirements for web development service
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $webService->id,
                'question' => 'Deskripsi singkat tentang website yang Anda inginkan'
            ],
            [
                'required' => true
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $webService->id,
                'question' => 'Apakah Anda memiliki desain/mockup yang sudah ada?'
            ],
            [
                'required' => false
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $webService->id,
                'question' => 'Website referensi yang Anda sukai'
            ],
            [
                'required' => false
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $webService->id,
                'question' => 'Preferensi warna dan font'
            ],
            [
                'required' => false
            ]
        );
        
        // Add FAQs for web development service
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $webService->id,
                'question' => 'Apakah saya perlu menyiapkan hosting dan domain sendiri?'
            ],
            [
                'answer' => 'Ya, Anda perlu menyediakan hosting dan domain. Namun, saya dapat membantu proses setup dan deployment website ke server Anda.'
            ]
        );
        
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $webService->id,
                'question' => 'Apakah saya akan mendapatkan source code website?'
            ],
            [
                'answer' => 'Ya, Anda akan mendapatkan full source code dan hak milik penuh atas website yang dibuat.'
            ]
        );
        
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $webService->id,
                'question' => 'Apakah website yang dibuat mendukung SEO?'
            ],
            [
                'answer' => 'Ya, semua website yang saya buat mengikuti praktik SEO terbaik untuk memastikan website Anda mudah ditemukan di mesin pencari.'
            ]
        );
        
        // Add gallery images for web development service
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $webService->id,
                'image_path' => 'storage\services\gallery\7WwLjZw9nChFdPqKZVVXOHfARNENk2NDHJ9fKgcJ.jpg',
            ],
            [
                'order' => 0
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $webService->id,
                'image_path' => 'storage\services\gallery\dob9ixqdNjBFMJBSpr7r6aysud56gksaJeGlu3l8.jpg',
            ],
            [
                'order' => 1
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $webService->id,
                'image_path' => 'storage\services\gallery\JT3J0XlRX1K6A2KUTP39e6OSQg1wQduYKXH1ABAI.jpg',
            ],
            [
                'order' => 2
            ]
        );
        
        $mobileService = Service::updateOrCreate(
            [
                'user_id' => $freelancer2->id,
                'title' => 'I will create a mobile app for Android and iOS'
            ],
            [
                'description' => 'I will design and develop a mobile app for both Android and iOS platforms using React Native or Flutter. The app will be optimized for performance and user experience.',
                'price' => 5000000,
                'price_type' => 'fixed',
                'delivery_time' => 20,
                'category_id' => $categoryMobile->id,
                'thumbnail' => 'storage\services\64366eb8649ff079fcc8d452_Visual_7.webp',
                'is_active' => true,
            ]
        );
        
        // Add service packages for mobile app service
        ServicePackage::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'title' => 'Paket Basic'
            ],
            [
                'price' => 5000000,
                'delivery_time' => 20,
                'revisions' => 2,
                'features' => json_encode(['Basic UI/UX design', 'Up to 5 screens', 'Basic functionality', 'Android platform only', '1 month support'])
            ]
        );
        
        ServicePackage::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'title' => 'Paket Pro'
            ],
            [
                'price' => 8000000,
                'delivery_time' => 30,
                'revisions' => 3,
                'features' => json_encode(['Custom UI/UX design', 'Up to 10 screens', 'Advanced functionality', 'Android & iOS platforms', 'Push notifications', '3 months support'])
            ]
        );
        
        ServicePackage::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'title' => 'Paket Enterprise'
            ],
            [
                'price' => 15000000,
                'delivery_time' => 45,
                'revisions' => 5,
                'features' => json_encode(['Premium UI/UX design', 'Unlimited screens', 'Complex functionality', 'Android & iOS platforms', 'Push notifications', 'User authentication', 'Database integration', 'Admin dashboard', '6 months support'])
            ]
        );
        
        // Add requirements for mobile app service
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'question' => 'Deskripsi singkat tentang aplikasi yang Anda inginkan'
            ],
            [
                'required' => true
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'question' => 'Daftar fitur utama yang dibutuhkan'
            ],
            [
                'required' => true
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'question' => 'Apakah Anda memiliki wireframe atau mockup aplikasi?'
            ],
            [
                'required' => false
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'question' => 'Platform yang diinginkan (Android, iOS, atau keduanya)'
            ],
            [
                'required' => true
            ]
        );
        
        // Add FAQs for mobile app service
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'question' => 'Apakah aplikasi akan tersedia di Play Store dan App Store?'
            ],
            [
                'answer' => 'Ya, saya dapat membantu proses publikasi aplikasi ke Play Store dan App Store, namun biaya publikasi ditanggung oleh klien.'
            ]
        );
        
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'question' => 'Apakah saya akan mendapatkan source code aplikasi?'
            ],
            [
                'answer' => 'Ya, Anda akan mendapatkan full source code dan hak kepemilikan penuh atas aplikasi yang dibuat.'
            ]
        );
        
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'question' => 'Apakah ada biaya tambahan untuk maintenance aplikasi?'
            ],
            [
                'answer' => 'Setiap paket sudah termasuk support untuk periode tertentu. Setelah periode tersebut berakhir, kami dapat mendiskusikan kontrak maintenance terpisah.'
            ]
        );
        
        // Add gallery images for mobile app service
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'image_path' => 'storage\services\gallery\Qf6LzIwAHhtNkJQ4dRglRfaDprmx1VCG8efiBoXs.jpg',
            ],
            [
                'order' => 0
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'image_path' => 'storage\services\gallery\QiKhTPzXIJHDoj5zyr3jnAp1ktlo0Cumz2s4aPNT.jpg',
            ],
            [
                'order' => 1
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'image_path' => 'storage\services\gallery\sy5v7iwNVSty63R6J4j2snNHNfGA5BsqVMzIH8pc.jpg',
            ],
            [
                'order' => 2
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $mobileService->id,
                'image_path' => 'storage\services\gallery\xN0lbLsiyNyoPgEbnDHqTIPGqKtZ3kPHqgehVvLo.jpg',
            ],
            [
                'order' => 3
            ]
        );
        
        $logoService = Service::updateOrCreate(
            [
                'user_id' => $freelancer1->id,
                'title' => 'I will design a modern and professional logo'
            ],
            [
                'description' => 'I will create a modern, professional logo for your business or project. You will receive the logo in various formats (PNG, JPG, SVG, AI) and color variations.',
                'price' => 1000000,
                'price_type' => 'fixed',
                'delivery_time' => 5,
                'revisions' => 3,
                'category_id' => $categoryDesign->id,
                'thumbnail' => 'storage\services\Apa-Sih-Tugas-Seorang-Web-Developer.webp',
                'is_active' => true,
            ]
        );
        
        // Add service packages for logo design service
        ServicePackage::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'title' => 'Paket Dasar'
            ],
            [
                'price' => 1000000,
                'delivery_time' => 5,
                'revisions' => 1,
                'features' => json_encode(['1 konsep logo', 'File format JPG dan PNG', 'Resolusi tinggi', 'Hak komersial'])
            ]
        );
        
        ServicePackage::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'title' => 'Paket Standar'
            ],
            [
                'price' => 1500000,
                'delivery_time' => 4,
                'revisions' => 3,
                'features' => json_encode(['3 konsep logo', 'File format JPG, PNG, dan SVG', 'Resolusi tinggi', 'Hak komersial', 'Source file'])
            ]
        );
        
        ServicePackage::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'title' => 'Paket Premium'
            ],
            [
                'price' => 2500000,
                'delivery_time' => 3,
                'revisions' => 5,
                'features' => json_encode(['5 konsep logo', 'File format JPG, PNG, SVG, dan AI', 'Resolusi tinggi', 'Hak komersial', 'Source file', 'Brand guidelines', 'Kartu nama dan kop surat'])
            ]
        );
        
        // Add requirements for logo design service
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'question' => 'Nama bisnis atau proyek Anda'
            ],
            [
                'required' => true
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'question' => 'Jenis industri atau sektor bisnis'
            ],
            [
                'required' => true
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'question' => 'Preferensi warna (jika ada)'
            ],
            [
                'required' => false
            ]
        );
        
        ServiceRequirement::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'question' => 'Apakah Anda memiliki material branding yang sudah ada?'
            ],
            [
                'required' => false
            ]
        );
        
        // Add FAQs for logo design service
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'question' => 'Berapa lama proses pembuatan logo?'
            ],
            [
                'answer' => 'Waktu pengerjaan logo tergantung pada paket yang dipilih, mulai dari 3-5 hari kerja.'
            ]
        );
        
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'question' => 'Apakah saya akan mendapatkan file sumber (source file)?'
            ],
            [
                'answer' => 'Ya, Anda akan mendapatkan file sumber (AI/SVG) pada paket Standar dan Premium.'
            ]
        );
        
        ServiceFaq::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'question' => 'Berapa kali saya bisa meminta revisi?'
            ],
            [
                'answer' => 'Jumlah revisi tergantung pada paket yang dipilih, mulai dari 1 revisi untuk paket Dasar hingga 5 revisi untuk paket Premium.'
            ]
        );
        
        // Add gallery images for logo design service
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'image_path' => 'storage\services\gallery\xO5KHsrY1Jf8pXc7s0VNXWfORTeV2coLKGCsxe4J.jpg',
            ],
            [
                'order' => 0
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'image_path' => 'storage\services\gallery\yDEx1a6yrWdoEV7enuAccSqx3KqPCSJcpeMd8OVo.jpg',
            ],
            [
                'order' => 1
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'image_path' => 'storage\services\gallery\YXjCnHnYVLYhR95PNlTKMVRKyudB7Q9U4IZDnA0p.jpg',
            ],
            [
                'order' => 2
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'image_path' => 'storage\services\AUU5J61kiwNmMSLe42cnf9mxgNjFvX5K4uza1V5K.jpg',
            ],
            [
                'order' => 3
            ]
        );
        
        ServiceGallery::updateOrCreate(
            [
                'service_id' => $logoService->id,
                'image_path' => 'storage\services\content-creator.png',
            ],
            [
                'order' => 4
            ]
        );
        
        // Create demo users for testing (with different emails)
        $demoAdmin = User::updateOrCreate(
            ['email' => 'admin_demo@mahabisa.com'],
            [
                'name' => 'Admin Demo',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'profile_photo_url' => 'https://randomuser.me/api/portraits/men/1.jpg',
            ]
        );
        
        $demoClient = User::updateOrCreate(
            ['email' => 'client_demo@mahabisa.com'],
            [
                'name' => 'Client Demo',
                'password' => Hash::make('password123'),
                'role' => 'client',
                'profile_photo_url' => 'https://randomuser.me/api/portraits/women/2.jpg',
            ]
        );
        
        $demoFreelancer = User::updateOrCreate(
            ['email' => 'freelancer_demo@mahabisa.com'],
            [
                'name' => 'Freelancer Demo',
                'password' => Hash::make('password123'),
                'role' => 'freelancer',
                'profile_photo_url' => 'https://randomuser.me/api/portraits/men/3.jpg',
            ]
        );
        
        // Create profiles for demo users
        UserProfile::updateOrCreate(
            ['user_id' => $demoAdmin->id],
            [
                'bio' => 'Demo administrator account',
                'phone_number' => '+628123456789',
                'address' => 'Jl. Demo Admin No. 1',
                'city' => 'Jakarta',
                'province' => 'DKI Jakarta',
                'is_verified' => true,
            ]
        );
        
        UserProfile::updateOrCreate(
            ['user_id' => $demoClient->id],
            [
                'bio' => 'Demo client account for testing purposes',
                'phone_number' => '+628234567890',
                'address' => 'Jl. Demo Client No. 2',
                'city' => 'Bandung',
                'province' => 'Jawa Barat',
                'is_verified' => true,
            ]
        );
        
        UserProfile::updateOrCreate(
            ['user_id' => $demoFreelancer->id],
            [
                'bio' => 'Demo freelancer account with various skills',
                'phone_number' => '+628345678901',
                'address' => 'Jl. Demo Freelancer No. 3',
                'city' => 'Surabaya',
                'province' => 'Jawa Timur',
                'website' => 'https://demo-freelancer.com',
                'social_media_links' => json_encode([
                    'linkedin' => 'demofreelancer',
                    'github' => 'demofreelancer'
                ]),
                'is_verified' => true,
            ]
        );
    }
}
