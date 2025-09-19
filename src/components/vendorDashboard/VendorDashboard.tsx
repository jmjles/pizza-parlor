import { Grid2 } from '@mui/material'
import Bar from '@/components/bar/Bar.tsx'
import { useEffect, useState } from 'react'
import TabPanel from '@/components/Panel/TabPanel.tsx'
import { useAppDispatch } from '@/store/hooks.tsx'
import orderApi from '@/lib/api/orderApi.ts'
import { setOrders } from '@/store/slices.tsx'

const VendorDashboard = () => {
    const [tab, setTab] = useState(0)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const getOrders = async () => {
            const token = localStorage.getItem('token')
            if (!token) return
            const orders = await orderApi.getOrders()
            dispatch(setOrders(orders))
        }
        if (tab === 3 || tab === 4) getOrders()
    }, [tab])

    return (
        <Grid2 container flexDirection="column" wrap="nowrap">
            <Grid2>
                <Bar tab={[tab, setTab]} />
            </Grid2>
            <Grid2>
                <TabPanel tab={tab} />
            </Grid2>
        </Grid2>
    )
}
export default VendorDashboard
