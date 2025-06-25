'use client'
import CustomerDashboard from '@/components/customerDashboard/CustomerDashboard.tsx'
import StoreDashboard from '@/components/storeDashboard/StoreDashboard.tsx'
import Welcome from '@/components/welcome/Welcome.tsx'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectStore } from '@/store/selectors.tsx'
import Stores from '@/components/stores/Stores.tsx'
import stores from '@/components/stores/Stores.tsx'
import { storeSampleData } from '@/assets/sampleData.tsx'
import Login from '@/components/login/Login.tsx'
import SignUp from '@/components/signUp/SignUp.tsx'

export default function Home() {
    const store = useAppSelector(selectStore).store;

    return (
        <div>
            {store.streetAddress && <CustomerDashboard/>}
            <Stores stores={storeSampleData}/>
            <Login />
            <SignUp />
            <StoreDashboard/>
            <Welcome/>
        </div>
    )
}
