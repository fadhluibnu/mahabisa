import React from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import ScheduleCard from './Components/ScheduleCard';

const Schedule = () => {
  // Dummy data for schedule
  const scheduleItems = [
    {
      id: 1,
      time: '09:00 - 10:30',
      title: 'Kick-off Meeting dengan PT Maju Bersama',
      description: 'Diskusi kebutuhan redesain website e-commerce',
      type: 'meeting',
      client: {
        name: 'Budi Santoso',
        position: 'Project Manager',
        image: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
      },
    },
    {
      id: 2,
      time: '11:00 - 12:30',
      title: 'Revisi Desain UI Mobile App',
      description: 'Memperbaiki tampilan home screen dan menu navigasi',
      type: 'task',
      project: 'Pengembangan Aplikasi Mobile',
    },
    {
      id: 3,
      time: '13:30 - 14:30',
      title: 'Call dengan Client StartUp Inovasi',
      description: 'Update progress pengembangan aplikasi mobile',
      type: 'meeting',
      client: {
        name: 'Diana Putri',
        position: 'CEO',
        image: 'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
      },
    },
    {
      id: 4,
      time: '15:00 - 17:00',
      title: 'Implementasi Payment Gateway',
      description: 'Integrasi Midtrans ke sistem toko online',
      type: 'task',
      project: 'Integrasi Payment Gateway',
    },
  ];

  // Dummy data for upcoming schedule
  const upcomingSchedule = [
    {
      id: 5,
      date: 'Besok',
      time: '10:00 - 11:30',
      title: 'Review Progress dengan PT Maju Bersama',
      description: 'Presentasi halaman utama dan halaman produk',
      type: 'meeting',
      client: {
        name: 'Budi Santoso',
        position: 'Project Manager',
        image: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
      },
    },
    {
      id: 6,
      date: '18 Juni 2023',
      time: '13:00 - 14:00',
      title: 'Presentasi Final Aplikasi Mobile',
      description: 'Demo aplikasi mobile kepada stakeholder',
      type: 'meeting',
      client: {
        name: 'Diana Putri',
        position: 'CEO',
        image: 'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
      },
    },
  ];

  return (
    <FreelancerLayout
      title="Jadwal"
      subtitle="Kelola jadwal meeting dan tugas harian Anda"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Jadwal Hari Ini</h2>
          <div>
            <span className="text-sm font-medium text-gray-500">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {scheduleItems.map((item) => (
            <div key={item.id} className="border-b border-gray-100 last:border-b-0">
              <ScheduleCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Jadwal Mendatang</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {upcomingSchedule.map((item) => (
            <div key={item.id} className="border-b border-gray-100 last:border-b-0">
              <div className="px-4 py-2 bg-gray-50">
                <span className="text-sm font-medium text-gray-500">{item.date}</span>
              </div>
              <ScheduleCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Schedule;
