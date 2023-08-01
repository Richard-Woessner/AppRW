import { createDrawerNavigator } from '@react-navigation/drawer';
import { Test } from '../../../app/test/Test';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Test} />
      <Drawer.Screen name="Article" component={Test} />
    </Drawer.Navigator>
  );
}
