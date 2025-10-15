import { Redirect } from 'expo-router'
import { configureReanimatedLogger } from 'react-native-reanimated'

import '../global.css'

global.Buffer = require('buffer/').Buffer

configureReanimatedLogger({ strict: false })

export default () => <Redirect href="/modes" />
