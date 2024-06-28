export default {
  items: [{
      name: 'Dasbor',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'BPM',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    // {
    //   name: 'Permohonan',
    //   url: '/bussiness-process-desaigner',
    //   icon: 'icon-puzzle',
    //   children: [{
    //       name: 'Permohonan PK',
    //       url: '/bussiness-process-desaigner/workflow-initializationpk2',
    //       icon: 'fa fa-check-circle-o'
    //     },
    //     {
    //       name: 'Permohonan BL',
    //       url: '/bussiness-process-desaigner/workflow-initialization2',
    //       icon: 'fa fa-check-circle-o'
    //     },
    //   ]
    // },
    {
      name: 'Kemitraan',
      url: '/pk',
      icon: 'fa fa-user',
      children: [
        {
          name: 'Permohonan',
          url: '/bussiness-process-desaigner/workflow-initializationpk2',
          icon: 'fa fa-check-circle-o'
        },
        {
          name: 'Perjanjian Kerjasama',
          url: '/pk/perjanjian',
          icon: 'fa fa-bandcamp'
        },
        {
          name: 'Daftar Jadwal Pembayaran',
          url: '/pk/jadwal_pembayaran',
          icon: 'fa fa-bandcamp'
        }, 
        {
          name: 'Simulasi Kredit',
          url: '/setting/simulasi',
          icon: 'fa fa-check-circle-o'
        },
        {
          name: 'Pencairan',
          url: '/pk/pencairan',
          icon: 'fa fa-bandcamp'
        },
        // {
        //   name: 'Sector',
        //   url: '/pk/sector',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Cabang',
        //   url: '/pk/cabang',
        //   icon: 'fa fa-bandcamp'
        // },
        {
          name: 'Customer',
          url: '/pk/customer',
          icon: 'fa fa-bandcamp'
        },
        {
          name: 'Daftar Pengakuan',
          url: '/pk/daftar-pengakuan',
          icon: 'fa fa-bandcamp'
        },
        // {
        //   name: 'Debt Account',
        //   url: '/pk/debtAccount',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Pembayaran',
        //   url: '/pk/pembayaran',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Provisioning',
        //   url: '/pk/provisioning',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Bank Account',
        //   url: '/pk/bankAccount',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Customers Installment',
        //   url: '/pk/customersInstallment',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Customers Installment (No Unidentified)',
        //   url: '/pk/customersInstallmentNoUnidentified',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Synergy',
        //   url: '/pk/synergy',
        //   icon: 'fa fa-bandcamp'
        // },
        // {
        //   name: 'Bad Debt Resolution',
        //   url: '/pk/badDebtResolution',
        //   icon: 'fa fa-bandcamp'
        // }

      ]
    },
    {
      name: 'Bina Lingkungan',
      url: '/bina-lingkungan',
      icon: 'fa fa-users',
      children: [
        // {
        //   name: 'Rencana Kerja Anggaran',
        //   url: '/bina-lingkungan/upload',
        //   icon: 'fa fa-sitemap'
        // },
        {
          name: 'Permohonan',
          url: '/bussiness-process-desaigner/workflow-initialization2',
          icon: 'fa fa-check-circle-o'
        },
        {
          name: 'SP3',
          url: '/bina-lingkungan/perjanjian',
          icon: 'fa fa-handshake-o'
        },
        {
          name: 'Pencairan',
          url: '/bina-lingkungan/pencairan',
          icon: 'fa fa-clipboard '
        },


      ]
    },

      {
        name: 'Akuntansi',
        url: '/accounting',
        icon: 'fa fa-usd',
        children: [
          // {
          //   name: 'Chart Of Account',
          //   url: '/accounting/chart-of-account',
          //   icon: 'fa fa-sitemap'
          // },
          // {
          //   name: 'Financial Setting',
          //   url: '/accounting/financial-setting',
          //   icon: 'fa fa-cogs'
          // },
          // {
          //   name: 'Financial Report',
          //   url: '/accounting/financial-report',
          //   icon: 'fa fa-line-chart'
          // },
          // {
          //   name: 'Initial Balance',
          //   url: '/accounting/initial-balance',
          //   icon: 'fa fa-credit-card'
          // },
          {
            name: 'Journal Posting',
            url: '/accounting/jurnal-pos',
            icon: 'fa fa-pencil'
          },
          {
            name: 'Jurnal Kas',
            url: '/accounting/jurnal-kas-bank',
            icon: 'cui-note'
          },
          {
            name: 'Jurnal Umum',
            url: '/accounting/jurnal-umum',
            icon: 'cui-note'
          },
          {
            name: 'Jurnal Uang Muka',
            url: '/accounting/jurnal-uang-muka',
            icon: 'cui-note'
          },
          // {
          //   name: 'Panjar Uang Muka',
          //   url: '/accounting/jurnal-panjar-form',
          //   icon: 'cui-note'
          // },
          {
            name: 'Jurnal Adjustment',
            url: '/accounting/jurnal-adjustment',
            icon: 'cui-note'
          },
          {
            name: 'Jurnal Transfer Dana Bank',
            url: '/accounting/jurnal-dropping',
            icon: 'cui-note'
          },
          {
            name: 'Jurnal Accrual',
            url: '/accounting/jurnal-accrual',
            icon: 'cui-note'
          },
          // {
          //   name: 'Jurnal Kas Bank PK',
          //   url: '/accounting/jurnal-kas-bank-pk',
          //   icon: 'cui-note'
          // },
          // {
          //   name: 'Jurnal Kas Bank BL',
          //   url: '/accounting/jurnal-kas-bank-bl',
          //   icon: 'cui-note'
          // },
          // {
          //   name: 'Jurnal Kas Bank PKBL',
          //   url: '/accounting/jurnal-kas-bank-pkbl',
          //   icon: 'cui-note'
          // },
        ]
      },

    {
      name: 'Monitor',
      url: '/monitor',
      icon: 'icon-wrench',
      children: [{
          name: 'Pembayaran',
          url: '/monitor/inst-schedule',
          icon: 'fa fa-calendar-calendar-o'
        },
        {
          name: 'Kartu Piutang',
          url: '/monitor/kartu-piutang',
          icon: 'fa fa-calendar-calendar-o'
        },
        {  
          name: 'Surat Konfirmasi Piutang',
          url: '/monitor/data-konfirmasi-piutang',
          icon: 'fa fa-calendar-calendar-o'
        },
        {  
          name: 'Rescheduling',
          url: '',
          icon: 'fa fa-calendar-calendar-o'
        },
        {
          name: 'Reconditioning',
          url: '',
          icon: 'fa fa-calendar-calendar-o'
        },
        ]
      },
      {
        name: 'Laporan',
        url: '/Laporan',
        icon: 'fa fa-users',
        children: [{
            name: 'Laporan Realisasi Program kemitraan',
            url: '/Laporan/Realisasi-Program',
            icon: 'fa fa-clipboard'
          },
          {
            name: 'Laporan Realisasi Bina Lingkungan',
            url: '/Laporan/Realisasi-Bina-Lingkungan',
            icon: 'fa fa-clipboard '
          },
          {
            name: 'Laporan Pengembalian Angsuran',
            url: '/Laporan/Pengembalian-Angsuran',
            icon: 'fa fa-clipboard '
          },
          {
            name: 'LPPMB',
            url: '/Laporan/Perkembangan-Pinjaman-Mitra-Binaan',
            icon: 'fa fa-clipboard '
          },
          {
            name: 'Bagan Akun',
            url: '/Laporan/Bagan-Akun',
            icon: 'fa fa-clipboard'
          },
          {
            name: 'Laporan Angsuran Mitra Per Bulan',
            url: '/Laporan/Angsuran-Mitra',
            icon: 'fa fa-clipboard '
          },
          {
            name: 'Laporan Detail Jurnal',
            url: '/Laporan/Detail-Journal',
            icon: 'fa fa-clipboard '
          },
          // {
          //   name: 'Laporan Arus Kas',
          //   url: '/Laporan/ArusKas',
          //   icon: 'fa fa-clipboard '
          // },
          {
            name: 'Laporan Keuangan',
            url: '/Laporan/Neraca',
            icon: 'fa fa-clipboard '
          },
          {
            name: 'Kolektabilitas',
            url: '/Laporan/Kolektabilitas',
            icon: 'fa fa-clipboard '
          },
        ]
      },
      // {
      // name: 'Administrasi',
      // url: '/administrasi',
      // icon: 'fa fa-users',
      // children: [
      //   // {
      //   //     name: 'Closing Harian',
      //   //     url: '/administrasiHarian',
      //   //     icon: 'icon-wrench',
      //   // },
      //   {
      //       name: 'Closing Bulanan',
      //       url: '/administrasiBulanan',
      //       icon: 'icon-wrench',
      //   },
      //   {
      //       name: 'Closing Tahunan',
      //       url: '/administrasiTahunan',
      //       icon: 'icon-wrench',
      //   },
      //   // {
      //   //     name: 'Closing Kolektabilitas',
      //   //     url: '/administrasi',
      //   //     icon: 'icon-wrench',
      //   // },
      //   ]
      // },
    // {
    //   name: 'Setting',
    //   url: '/setting',
    //   icon: 'icon-puzzle',
    //   children: [{
    //     name: 'Upload Massal',
    //     url: '/UploadMassal',
    //     icon: 'fa fa-check-circle-o'
    //   },{
    //     name: 'Jenis Pinjaman',
    //     url: '/setting/pktype',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //   {
    //     name: 'Jenis Sektor Usaha',
    //     url: '/setting/pksector',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //   {
    //     name: 'Account',
    //     url: '/setting/account',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //   {
    //     name: 'Account Group',
    //     url: '/setting/accountGroup',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //   {
    //     name: 'Account Mapping',
    //     url: '/setting/accountMapping',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //   {
    //     name: 'Jenis Pembayaran',
    //     url: '/setting/payment-type',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //   {
    //     name: 'Simulasi Kredit',
    //     url: '/setting/simulasi',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //   {
    //     name: 'Suku Bunga',
    //     url: '/setting/sukuBunga',
    //     icon: 'fa fa-check-circle-o'
    //   },
    //  ]
    // },
  ]
}
