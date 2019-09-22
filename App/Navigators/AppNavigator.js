import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

// import TextDetector from 'App/Containers/TextDetection'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
// const StackNavigator = createStackNavigator(
//   {
//     // Create the application routes here (the key is the route name, the value is the target screen)
//     // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
//     // The main application screen is our "ExampleScreen". Feel free to replace it with your
//     // own screen and remove the example.
//     MainScreen: TextDetector,
//     TextDetector: TextDetector,
//   },
//   {
//     // By default the application will show the splash screen
//     initialRouteName: 'TextDetector',
//     // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
//     headerMode: 'none',
//   }
// )

import HomeScreen from 'App/Containers/HomeScreen'
import DraftScreen from 'App/Containers/DraftScreen'
import AuthScreen from 'App/Containers/AuthScreen'
import TextDetection from 'App/Containers/TextDetection'

const AuthStack = createStackNavigator({
	MainScreen: AuthScreen,
})

const AppStack = createStackNavigator({
	MainScreen: HomeScreen,
	Draft: DraftScreen,
	Recognizer: TextDetection,
})

export default createAppContainer(
	createSwitchNavigator(
		{
			App: AppStack,
			Auth: AuthStack,
		},
		{
			initialRouteName: 'Auth',
		}
	)
)
