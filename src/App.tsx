import UserList from './Components/UserList/UserList.tsx';
import { Toaster } from 'sonner';

function App() {
	return (
		<div className={'container mx-auto text-3xl'}>
			<Toaster richColors />
			<UserList />
		</div>
	);
}

export default App;
