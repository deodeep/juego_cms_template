// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation: VerticalNavItemsType = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/'
  },
  {
    title: 'Tournament',
    icon: HomeOutline,
    path: '/tournament'
  },
  {
    title: 'Create Tournament',
    icon: HomeOutline,
    path: '/createTournament'
  },
 
  // {
  //   title: 'Account Settings',
  //   icon: AccountCogOutline,
  //   path: '/account-settings'
  // },
  // {
  //   sectionTitle: 'Pages'
  // },
  // {
  //   title: 'Login',
  //   icon: Login,
  //   path: '/login'
  // }
  // {
  //   title: 'Register',
  //   icon: AccountPlusOutline,
  //   path: '/register',
  // },
  // {
  //   title: 'Error',
  //   icon: AlertCircleOutline,
  //   path: '/error',
  // },
  // {
  //   sectionTitle: 'User Interface'
  // },
  // {
  //   title: 'Typography',
  //   icon: FormatLetterCase,
  //   path: '/typography'
  // },
  // {
  //   title: 'Icons',
  //   path: '/icons',
  //   icon: GoogleCirclesExtended
  // },
  // {
  //   title: 'Cards',
  //   icon: CreditCardOutline,
  //   path: '/cards'
  // },
  // {
  //   title: 'Tables',
  //   icon: Table,
  //   path: '/tables'
  // },
  // {
  //   icon: CubeOutline,
  //   title: 'Form Layouts',
  //   path: '/form-layouts'
  // },
]

const rolePermissions: rolePermissionType = {
  SUPER_ADMIN: {
    routes: ['/', '/tournament', '/createTournament']
  },
  ADMIN: {
    routes: ['/', '/tournament']
  }
}

const nonAuthRoutes = ['/login', '/register', '/forgotPassword']

const getRoleAuthorizedPages = (role: keyof rolePermissionType) => {
  const rolePermissionDetails = rolePermissions[role]
  if (rolePermissionDetails) {
    const filteredSideBarData = navigation.filter(pageDetails =>
      rolePermissionDetails.routes.includes(pageDetails.path)
    )
    return filteredSideBarData
  }
}

export { getRoleAuthorizedPages, rolePermissions, nonAuthRoutes }
