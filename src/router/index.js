import Vue from 'vue'
import Router from 'vue-router'

// Containers
import DefaultContainer from '@/containers/DefaultContainer'

// Views
import Dashboard from '@/views/Dashboard'
// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'

// Users
import Users from '@/views/users/Users'
import User from '@/views/users/User'

//coba
import Upload from '@/views/base/upload'

//Simulasi
import Simulasi from '@/views/Simulasi/Index'


// PK
import Sector from '@/views/pk/Sector'
import Cabang from '@/views/pk/Cabang'
import Customer from '@/views/pk/MasterDataCustomer'
import DebtAccount from '@/views/pk/DebtAccount/Index'
import Provisioning from '@/views/pk/Provisioning/Index'
import BankAccount from '@/views/pk/BankAccountReconciliation'
import CustomersInstallment from '@/views/pk/CustomersInstallment'
import CustomersInstallmentNoUnidentified from '@/views/pk/CustomersInstallmentNoUnidentified'
import Synergy from '@/views/pk/Synergy'
import BadDebtResolution from '@/views/pk/BadDebtResolution'
import Pembayaran from '@/views/pk/Pembayaran/Index'
import Perjanjian from '@/views/pk/Perjanjian/Persetujuan'
import JadwalPembayaran from '@/views/pk/JadwalPembayaran/Index'
import PencairanPK from '@/views/pk/Pencairan/Index'
import DaftarPengakuan from '@/views/pk/DaftarPengakuan/Index'
//Kartu Piutang
import KartuPiutang from '@/views/pk/KartuPiutang/Index'
//
import Debitor from '@/views/pk/Debitor/Index'


// Bina Lingkungan
import Rka from '@/views/bl/rka/Index'
import Pencairan from '@/views/bl/Pencairan/Index'
import PerjanjianBL from '@/views/bl/Perjanjian/Index'

// Business Process Management
import DocumentDesaigner from '@/views/bussinessProcessDesaigner/documentDesaigner/Index'
import FormDocumentDesaigner from '@/views/bussinessProcessDesaigner/documentDesaigner/Form'
import OrganizationTmpls from '@/views/OrganizationTmpls/OrganizationTmpls'
import WorkUnit from '@/views/OrganizationTmpls/WorkUnit'
import Territorial1 from '@/views/TerritoryMapping/Territorial1'
import Territorial2 from '@/views/TerritoryMapping/Territorial2'
import Headquarters from '@/views/OrganizationStructure/Headquarters'
import RegionalOffice from '@/views/OrganizationStructure/RegionalOffice'
import RegionalOfficeProfile from '@/views/OrganizationStructure/RegionalOfficeProfile'
import BranchOfficeProfile from '@/views/OrganizationStructure/BranchOfficeProfile'
import BussinessProcess from '@/views/bussinessProcessDesaigner/bussinessProcess/Index'
import FormBussinessProcess from '@/views/bussinessProcessDesaigner/bussinessProcess/Form'
import WorkflowInitialization from '@/views/bussinessProcessDesaigner/WorkflowInitialization/Index'
import FormWorkflowInitialization from '@/views/bussinessProcessDesaigner/WorkflowInitialization/Form'
import ReviewAndApproval from '@/views/bussinessProcessDesaigner/ReviewAndApproval/Index'
import FormReviewAndApproval from '@/views/bussinessProcessDesaigner/ReviewAndApproval/Form'
import Survey from '@/views/bussinessProcessDesaigner/Survey/Index'
import FormSurvey from '@/views/bussinessProcessDesaigner/Survey/Form'
import FormApprovalStatis from '@/views/StatisForm/Approval/Form'
import FormApprovalPKStatis from '@/views/StatisForm/Approval/Formpk'
import FormReviewAndApprovalStatis from '@/views/StatisForm/ReviewAndApproval/Form'
import FormReviewAndApprovalPKStatis from '@/views/StatisForm/ReviewAndApproval/Formpk'
import FormWorkflowInitializationStatis from '@/views/StatisForm/WorkflowInitialization/Form'
import FormWorkflowInitializationPKStatis from '@/views/StatisForm/WorkflowInitialization/Formpk'
import WorkflowInitializationStatis from '@/views/StatisForm/WorkflowInitialization/Index'
import WorkflowInitializationPKStatis from '@/views/StatisForm/WorkflowInitialization/IndexPK'
import ReviewAndApprovalStatis from '@/views/StatisForm/ReviewAndApproval/Index'
import UploadMassal from '@/views/StatisForm/UploadMassal/form'
import FormWorkflowInitializationBLStatis from '@/views/StatisForm/WorkflowInitialization/Formpk'
import Formpembayaran from '@/views/StatisForm/FormPembayaran'
import FormAdministrasi from '@/views/StatisForm/Administrasi'
import FormAdministrasiKolektabilitas from '@/views/StatisForm/AdministrasiCollectability'
import FormAdministrasiBulanan from '@/views/StatisForm/AdministrasiBulanan'
import FormAdministrasiTahunan from '@/views/StatisForm/AdministrasiTahunan'
import FormAdministrasiHarian from '@/views/StatisForm/AdministrasiHarian'
import LiatKartuPiutang from '@/views/StatisForm/LiatKartuPiutang'
import TablePK from '@/views/StatisForm/WorkflowInitialization/Table'
import Table from '@/views/StatisForm/FormTable'
import JurnalTransaksiKasBank from '@/views/StatisForm/JurnalTransaksiKasBank'
import BuktiKasBank from '@/views/StatisForm/BuktiKasBank'
//Accounting
import AccrualForm from '@/views/accounting/Accrual/form'
import ChartOfAccountForm from '@/views/accounting/ChartOfAccount/form'
import FinancialSettingForm from '@/views/accounting/FinancialSetting/Form'
import FinancialReportForm from '@/views/accounting/FinancialReport/Form'
import InitialBalanceForm from '@/views/accounting/InitialBalance/form'
import DetailedBalanceForm from '@/views/accounting/DetailedBalance/form'
import GeneralJournalForm from '@/views/accounting/GeneralJournal/form'
import ChartOfAccount from '@/views/accounting/ChartOfAccount/Index'
// import FinancialReport from'@/views/accounting/FinancialReport/Index'
// import InitialBalance from'@/views/accounting/InitialBalance/Index'
// import DetailedBalance from'@/views/accounting/DetailedBalance/Index'
import GeneralJournal from'@/views/accounting/GeneralJournal/Index'
import JurnalPosForm from'@/views/Jurnal/JurnalPos/form'
import JurnalUmumForm from'@/views/accounting/JurnalUmum/form'
import JurnalUmum from'@/views/accounting/JurnalUmum/Index'
import JurnalAdjusmentForm from'@/views/accounting/JurnalAdjustment/form'
import JurnalAdjusment from'@/views/accounting/JurnalAdjustment/Index'
import JurnalKasBankForm from'@/views/accounting/JurnalKasBank/form'
import JurnalKasBankPKForm from'@/views/accounting/JurnalKasBank/formpk'
import JurnalKasBankBLForm from'@/views/accounting/JurnalKasBank/formbl'
import JurnalKasBankPKBLForm from'@/views/accounting/JurnalKasBank/formpkbl'
import JurnalKasBank from'@/views/accounting/JurnalKasBank/Index'

import JurnalAccrual from'@/views/accounting/JurnalAccrual/Index'
import JurnalAccrualForm from'@/views/accounting/JurnalAccrual/Form'

import JurnalPenyaluranBLForm from'@/views/accounting/JurnalPenyaluranBL/form'
import JurnalPenyaluranBL from'@/views/accounting/JurnalPenyaluranBL/Index'

import JurnalKasBankPK from'@/views/accounting/JurnalKasBank/Indexpk'
import JurnalKasBankBL from'@/views/accounting/JurnalKasBank/Indexbl'
import JurnalKasBankPKBL from'@/views/accounting/JurnalKasBank/Indexpkbl'

// import JurnalKoreksi from'@/views/accounting/JurnalKoreksi/Index'
import JurnalUangMukaForm from '@/views/accounting/JurnalUangMuka/form'
import JurnalUangMuka from '@/views/accounting/JurnalUangMuka/Index'
import JurnalPanjarForm from '@/views/accounting/JurnalPanjar/form'
import JurnalPanjar from '@/views/accounting/JurnalPanjar/index'
import JurnalDroppingForm from '@/views/accounting/JurnalDropping/form'
import JurnalDropping from '@/views/accounting/JurnalDropping/Index'
//Laporan
import AngsuranMitraForm from '@/views/Laporan/Angsuran-Mitra/form'
import BaganAkunForm from '@/views/Laporan/Bagan-Akun/form'
import RealisasiBinaForm from '@/views/Laporan/Realisasi-Bina-Lingkungan/form'
import RealisasiProgramForm from '@/views/Laporan/Realisasi-Program/form'
import SemuaJurnalForm from '@/views/Laporan/Semua-Jurnal/form'
import ArusKasForm from '@/views/Laporan/ArusKas/form'
import NeracaForm from '@/views/Laporan/Neraca/form'
import KolektabilitasIndex from '@/views/Laporan/Kolektabilitas/index'
import LPPMBForm from '@/views/Laporan/Perkembangan-Pinjaman-Mitra-Binaan/form'
import PengembalianAngsuran from '@/views/Laporan/Pengembalian_Angsuran/index'
//Monitor
import JadwalPembayaranForm from '@/views/monitor/Inst-schedule/form'
import FormLebihBayar from '@/views/monitor/lebih_bayar/form'
//konfirmasi piutang
import KonfirmasiPiutang from '@/views/monitor/KomfirmasiPiutang/form'
import DataKonfirmasiPiutang from '@/views/monitor/KomfirmasiPiutang/index'

//General
import PaymentType from '@/views/Setting/JenisPembayaran/Index'
import PKType from '@/views/Setting/pk/PKType/Index'
import PKSector from '@/views/Setting/pk/PKSector/Index'
import KotaKab from '@/views/Setting/KotaKab/Index'
import Provinsi from '@/views/Setting/Provinsi/Index'
import Account from '@/views/Setting/Account/Index'
import AccountMapping from '@/views/Setting/AccountMapping/Index'
import AccountGroup from '@/views/Setting/AccountGroup/Index'
import SukuBunga from '@/views/Setting/SukuBunga/Index'


Vue.use(Router)

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [{
        path: '/',
        redirect: '/login',
        name: 'Home',
        component: DefaultContainer,
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: Dashboard
          },
          {
            path: 'upload',
            name: 'Upload',
            component: Upload
          },
          {
            path: 'UploadMassal',
            name: 'UploadMassal',
            component: UploadMassal
          },
          {
              path: 'administrasi',
              name: 'Administrasi',
              component: FormAdministrasi
          },
          {
              path: 'administrasiBulanan',
              name: 'AdministrasiBulanan',
              component: FormAdministrasiBulanan
          },
          {
              path: 'administrasiKolektabilitas',
              name: 'AdministrasiKolektabilitas',
              component: FormAdministrasiKolektabilitas
          },
          {
              path: 'administrasiTahunan',
              name: 'AdministrasiTahunan',
              component: FormAdministrasiTahunan
          },
          {
              path: 'administrasiHarian',
              name: 'AdministrasiHarian',
              component: FormAdministrasiHarian
          },
          {
              path: 'approval-form/:DebCode?/:DACode?/:AppWorkCode',
              name: 'Approval',
              component: FormApprovalStatis
          },
          {
            path: 'approval-form/:DebCode?/:DACode?/:AppWorkCode?/:Mode',
            name: 'Approval Ubah',
            component: FormApprovalStatis
          },
          {
            path: 'approval-formpk/:DebCode?/:DACode?/:AppWorkCode',
            name: 'Approval PK',
            component: FormApprovalPKStatis
          },
          {
            path: 'approval-formpk/:DebCode?/:DACode?/:AppWorkCode?/:Mode',
            name: 'Approval PK Ubah',
            component: FormApprovalPKStatis
          },

          {
            path: '/pk',
            redirect: '/pk/sector',
            name: 'PK',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [{
                path: 'perjanjian',
                name: 'Perjanjian Kerjasama',
                component: Perjanjian
              },
              {
                path: 'jadwal_pembayaran',
                name: 'Daftar Jadwal Pembayaran',
                component: JadwalPembayaran
              },
              {
                path: 'pencairan',
                name: 'Pencairan',
                component: PencairanPK
              },
              {
                path: 'sector',
                name: 'Sector',
                component: Sector
              },
              {
                path: 'cabang',
                name: 'Cabang',
                component: Cabang
              },
              {
                path: 'customer',
                name: 'Customers',
                component: Debitor
              },
              {
                path: 'debitor',
                name: 'Debitor',
                component: Debitor
              },
              {
                path: 'pembayaran/:DACode/:Value',
                name: 'Pembayaran',
                component: Formpembayaran
              },
              {
                path: 'kartupiutang/:DACode',
                name: 'Kartu Piutang',
                component: LiatKartuPiutang
              },
              {
                path: 'kartupiutang/:DACode?/:Print',
                name: 'Kartu Piutang Print',
                component: LiatKartuPiutang
              },
              {
                path: 'debtAccount',
                name: 'Debt Account',
                component: DebtAccount
              },
              {
                path: 'provisioning',
                name: 'Provisioning',
                component: Provisioning
              },
              {
                path: 'bankAccount',
                name: 'Bank Account',
                component: BankAccount
              },
              {
                path: 'customersInstallment',
                name: 'Customers Installment',
                component: CustomersInstallment
              },
              {
                path: 'customersInstallmentNoUnidentified',
                name: 'Customers Installment (No Unidentified)',
                component: CustomersInstallmentNoUnidentified
              },
              {
                path: 'synergy',
                name: 'Synergy',
                component: Synergy
              },
              {
                path: 'badDebtResolution',
                name: 'Bad Debt Resolution',
                component: BadDebtResolution
              },
              {
                path: 'daftar-pengakuan',
                name: 'Daftar Pengakuan',
                component: DaftarPengakuan
              }

            ]
          },
          {
            path: '/bussiness-process-desaigner',
            redirect: '/bussiness-process-desaigner/document-desaigner',
            name: 'Process Designer',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [{
                path: 'document-desaigner',
                name: 'Document Desaigner',
                component: DocumentDesaigner
              },
              {
                path: 'document-desaigner-form/:id?',
                name: 'Form Document Desaigner',
                component: FormDocumentDesaigner
              },
              {
                path: 'bussiness-process',
                name: 'Bussiness Process',
                component: BussinessProcess
              },
              {
                path: 'bussiness-process-form/:id?',
                name: 'Form Bussiness Process',
                component: FormBussinessProcess
              },
              {
                path: 'workflow-initialization2',
                name: 'Pengajuan',
                component: WorkflowInitializationStatis
              },
              {
                path: 'workflow-initializationpk2',
                name: 'PengajuanPK',
                component: WorkflowInitializationPKStatis
              },

              {
                path: 'workflow-initialization-form2/:DebCode?',
                name: 'Form Workflow Initialization',
                component: FormWorkflowInitializationStatis
              },
              {
                path: 'workflow-initialization-form2/:Mode?/:DebCode?/:DACode?',
                name: 'Form Workflow Initialization Ubah',
                component: FormWorkflowInitializationStatis
              },
              {
                path: 'workflow-initialization-formpk2/:DebCode?',
                name: 'Form Workflow Initialization PK',
                component: FormWorkflowInitializationPKStatis
              },
              {
                path: 'workflow-initialization-formpk2/:Mode?/:DebCode?/:DACode?',
                name: 'Form Workflow Initialization PK Ubah',
                component: FormWorkflowInitializationPKStatis
              },
              {
                path: 'workflow-initialization-form3',
                name: 'Form Workflow Initialization Kemitraan',
                component: FormWorkflowInitializationBLStatis
              },
              {
                path: 'workflow-initialization',
                name: 'Workflow Initialization',
                component: WorkflowInitialization
              },
              {
                path: 'workflow-initialization-form/:BussProcId?',
                name: 'Form Workflow Initialization',
                component: FormWorkflowInitialization
              },
              {
                path: 'pengajuan/:Type',
                name: 'Pengajuan',
                component: ReviewAndApproval
              },
              {
                path: 'review/:Type',
                name: 'Review',
                component: ReviewAndApproval
              },
              {
                path: 'approval/:Type',
                name: 'Approval',
                component: ReviewAndApproval
              },
              {
                path: 'review-and-approval',
                name: 'Penilaian',
                component: ReviewAndApprovalStatis
              },
              {
                path: 'review-and-approval-form/:DebCode?/:DACode?/:AppWorkCode',
                name: 'Form Review And Approval',
                component: FormReviewAndApprovalStatis
              },
              {
                path: 'review-and-approval-form/:DebCode?/:DACode?/:AppWorkCode?/:Mode',
                name: 'Form Review And Approval Ubah',
                component: FormReviewAndApprovalStatis
              },
              {
                path: 'review-and-approval-formpk/:DebCode?/:DACode?/:AppWorkCode',
                name: 'Form Review And Approval PK',
                component: FormReviewAndApprovalPKStatis
              },
              {
                path: 'review-and-approval-formpk/:DebCode?/:DACode?/:AppWorkCode/:Mode',
                name: 'Form Review And Approval PK Ubah',
                component: FormReviewAndApprovalPKStatis
              },
              {
                path: 'review-and-approval-form/:BussProcId?/:BussProExecId?/:AppId',
                name: 'Form Review And Approval',
                component: FormReviewAndApproval
              },
              {
                path: 'survey',
                name: 'Survey',
                component: Survey
              },
              {
                path: 'survey-form/:BussProExecId?',
                name: 'Form Survey',
                component: FormSurvey
              },
              {
                path: 'pembayaran',
                name: 'Form Pembayaran',
                component: Formpembayaran
              },
              {
                path: 'Table-PK',
                name: 'Table PK',
                component: TablePK
              },
              {
                path: 'Form-Table',
                name: 'Form Table',
                component: Table
              },
              {
                path: 'Form-Jurnal-Transaksi-Kas-Bank',
                name: 'Form Jurnal Transaksi Kas Bank',
                component: JurnalTransaksiKasBank
              },
              {
                path: ':name/:id',
                name: 'Print Bukti',
                component: BuktiKasBank
              },
            ]
          },
          {
            path: '/Laporan',
            redirect: '/Laporan/Realisasi-Program',
            name: 'Laporan',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [{
                path: 'Realisasi-Program',
                name: 'Realisasi-Program',
                component: RealisasiProgramForm
              },
              {
                path: 'Realisasi-Bina-Lingkungan',
                name: 'Realisasi-Bina-Lingkungan',
                component: RealisasiBinaForm
              },
              {
                path: 'Bagan-Akun',
                name: 'Bagan-Akun',
                component: BaganAkunForm
              },
              {
                path: 'Angsuran-Mitra',
                name: 'Angsuran-Mitra',
                component: AngsuranMitraForm
              },
              {
                path: 'Detail-Journal',
                name: 'Detail-Journal',
                component: SemuaJurnalForm
              },
              {
                path: 'ArusKas',
                name: 'ArusKas',
                component: ArusKasForm
              },
              {
                path: 'Neraca',
                name: 'Neraca',
                component: NeracaForm
              },
              {
                path: 'Perkembangan-Pinjaman-Mitra-Binaan',
                name: 'Perkembangan-Pinjaman-Mitra-Binaan',
                component: LPPMBForm
              },
              {
                path: 'Kolektabilitas',
                name: 'Kolektabilitas',
                component: KolektabilitasIndex
              },
              {
                path: 'Pengembalian-Angsuran',
                name: 'Pengembalian-Angsuran',
                component: PengembalianAngsuran
              },
            ]
          },
          {
            path: '/bina-lingkungan',
            redirect: '/bina-lingkungan/rka',
            name: 'Bina Lingkungan',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [{
                path: 'rka',
                name: 'Rka',
                component: Rka
              },
              {
                path: 'perjanjian',
                name: 'Perjanjian',
                component: PerjanjianBL
              },
              {
                path: 'pencairan',
                name: 'Pencairan',
                component: Pencairan
              },
            ]
          },
          {
            path: '/accounting',
            redirect: '/accounting/chart-of-account',
            name: 'Accounting',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [{
                path: 'accrual',
                name: 'Accrual',
                component: AccrualForm
              },

              {
                path: 'chart-of-account',
                name: 'Chart Of Account',
                component: ChartOfAccountForm
              },
              {
                path: 'chart-of-account-form/:id?',
                name: 'Chart Of Account Form',
                component: ChartOfAccountForm
              },
              {
                path: 'financial-setting',
                name: 'Financial Setting',
                component: FinancialSettingForm
              },
              {
                path: 'financial-report',
                name: 'Financial Report',
                component: FinancialReportForm
              },
              {
                path: 'initial-balance',
                name: 'Initial Balance',
                component: InitialBalanceForm
              },
              {
                path: 'detailed-balance/:AccountId',
                name: 'Detailed Balance',
                component: DetailedBalanceForm
              },
              {
                path: 'general-journal',
                name: 'General Journal',
                component: GeneralJournal
              },
              {
                path: 'general-journal-form/:id?',
                name: 'General Journal Form',
                component: GeneralJournalForm
              },
              {
                path: 'jurnal-pos',
                name: 'Jurnal Pos',
                component: JurnalPosForm
              },
              {
                path: 'jurnal-umum',
                name: 'Jurnal Umum',
                component: JurnalUmum
              },
              {
                path: 'jurnal-umum-form/:status?/:id?',
                name: 'Jurnal Umum Form',
                component: JurnalUmumForm
              },
              {
                path: 'jurnal-adjustment',
                name: 'Jurnal Adjustment',
                component: JurnalAdjusment
              },
              {
                path: 'jurnal-adjustment-form/:status?/:id?',
                name: 'Jurnal Adjustment Form',
                component: JurnalAdjusmentForm
              },
              {
                path: 'jurnal-accrual',
                name: 'Jurnal Accrual',
                component: JurnalAccrual
              },
              {
                path: 'jurnal-accrual-form/:status?/:id?',
                name: 'Jurnal Accrual Form',
                component: JurnalAccrualForm
              },
              {
                path: 'jurnal-accrual-form/:idAcc?/:type?',
                name: 'Proses Jurnal Accrual',
                component: JurnalAccrualForm
              },
              {
                path: 'jurnal-kas-bank',
                name: 'Jurnal Kas Bank',
                component: JurnalKasBank
              },
              {
                path: 'jurnal-kas-bank-pk',
                name: 'Jurnal Kas Bank-PK',
                component: JurnalKasBankPK
              },
              {
                path: 'jurnal-kas-bank-bl',
                name: 'Jurnal Kas Bank-BL',
                component: JurnalKasBankBL
              },
              {
                path: 'jurnal-kas-bank-pkbl',
                name: 'Jurnal Kas Bank-PKBL',
                component: JurnalKasBankPKBL
              },
              {
                path: 'jurnal-kas-bank-form/:status?/:id?',
                name: 'Jurnal Kas Bank Form',
                component: JurnalKasBankForm
              },
              {
                path: 'jurnal-penyaluran-bl-form/:id?',
                name: 'Jurnal Penyaluran BL Form',
                component: JurnalPenyaluranBLForm
              },
              {
                path: 'jurnal-penyaluran-bl',
                name: 'Jurnal Penyaluran BL',
                component: JurnalPenyaluranBL
              },
              {
              path: 'jurnal-kas-bank-pk-form/:id?',
              name: 'Jurnal Kas Bank-PK Form',
              component: JurnalKasBankPKForm
              },
              {
              path: 'jurnal-kas-bank-bl-form/:id?',
              name: 'Jurnal Kas Bank-BL Form',
              component: JurnalKasBankBLForm
              },
              {
              path: 'jurnal-kas-bank-pkbl-form/:id?',
              name: 'Jurnal Kas Bank-PKBL Form',
              component: JurnalKasBankPKBLForm
              },
              {
                path: 'jurnal-uang-muka',
                name: 'Jurnal Uang Muka',
                component: JurnalUangMuka
              },
              {
                path: 'jurnal-uang-muka-form/:status?/:id?/:DACode?',
                name: 'Jurnal Uang Muka Form',
                component: JurnalUangMukaForm
              },
              {
                path: 'jurnal-panjar-form/:DebCode?/:Jrn_ID?/:JrnUM?/:AccountCode?/:DACode?/:DANumber?/:Type?',
                name: 'Jurnal Panjar Form',
                component: JurnalPanjarForm
              },
              {
                path: 'jurnal-panjar/:status?/:id?',
                name: 'Jurnal Panjar',
                component: JurnalPanjar
              },
              {
                path: 'jurnal-dropping',
                name: 'Jurnal Transfer Dana Bank',
                component: JurnalDropping
              },
              {
                path: 'jurnal-dropping-form/:status?/:id?',
                name: 'Jurnal Transfer Dana Bank Form',
                component: JurnalDroppingForm
              },
            ]
          },
          {
            path: '/OrganizationStructure',
            redirect: '/OrganizationStructure/Headquarters',
            name: 'BPM',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [{
                path: 'Headquarters',
                name: 'Headquarters',
                component: Headquarters
              },
              {
                path: 'RegionalOffice',
                name: 'Regional Office',
                component: RegionalOffice
              },
              {
                path: 'RegionalOfficeProfile',
                name: 'Regional Office Profile',
                component: RegionalOfficeProfile
              },
              {
                path: 'BranchOfficeProfile',
                name: 'Branch Office Profile',
                component: BranchOfficeProfile
              },
            ]
          },
          {
            path: '/monitor',
            redirect: '/monitor/inst-schedule',
            name: 'monitor',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [{
              path: 'inst-schedule',
              name: 'inst-schedule',
              component: JadwalPembayaranForm
            },
            {
              path: 'lebih_bayar/:Status?/:DACode?/:Sektor?/:Value?',
              name: 'Lebih Bayar Form',
              component: FormLebihBayar
            },
              {
                path: 'kartu-piutang',
                name: 'Data Kartu Piutang',
                component: KartuPiutang
              },
              {
                path: 'konfirmasi-piutang/:konfirmasi(.*)*',
                name: 'Konfirmasi Piutang',
                component: KonfirmasiPiutang
              },
              {
                path: 'data-konfirmasi-piutang',
                name: 'Data Konfirmasi Piutang',
                component: DataKonfirmasiPiutang
              }
            ]
          },
          {
            path: '/setting',
            redirect: '/setting/pktype',
            name: 'setting',
            component: {
              render(c) {
                return c('router-view')
              }
            },

            children: [{
              path: 'pktype',
              name: 'Jenis Pinjaman',
              component: PKType,
            },
            {
              path: 'pksector',
              name: 'Jenis Sektor Usaha',
              component: PKSector,
            },
            {
              path: 'kotaKab',
              name: 'Kota / Kabupaten',
              component: KotaKab,
            },
            {
              path: 'provinsi',
              name: 'Provinsi',
              component: Provinsi,
            },
            {
              path: 'account',
              name: 'Account',
              component: Account,
            },
            {
              path: 'accountMapping',
              name: 'Account Mapping',
              component: AccountMapping,
            },
            {
              path: 'payment-type',
              name: 'Jenis Pembayaran',
              component: PaymentType
            },
            {
              path: 'accountGroup',
              name: 'Account Group',
              component: AccountGroup
            },
            {
              path: 'simulasi',
              name: 'Simulasi Kredit',
              component: Simulasi
            },
            {
              path: 'sukuBunga',
              name: 'Suku Bunga',
              component: SukuBunga
            },
            ]
          },

        ]
      },

      {
        path: '/login',
        name: 'Login',
        component: Login
      }
    ]
  },

)
