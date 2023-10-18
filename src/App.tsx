import UserList from './Components/UserList/UserList.tsx';
import { Toaster } from 'sonner';

function App() {
	return (
		<div className={'container mx-auto text-2xl  h-screen '}>
			<Toaster
				richColors
				duration={1000}
				closeButton
				visibleToasts={2}
				position={'top-center'}
				theme={'dark'}
				expand
			/>
			<UserList />
		</div>
	);
}

export default App;
