import { Redirect } from 'expo-router'
import { configureReanimatedLogger } from 'react-native-reanimated'

// import { Connect } from '@pages/connect'
// import { Modes } from '@pages/modes'
import '../global.css'

global.Buffer = require('buffer/').Buffer

configureReanimatedLogger({ strict: false })

export default () => <Redirect href="/connect" />
