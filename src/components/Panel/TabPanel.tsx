import MenuBuilder from '@/components/vendor/MenuBuilder/MenuBuilder.tsx'
import Items from '@/components/vendor/Item/Items.tsx'
import Ingredients from '@/components/vendor/Ingedient/Ingredients.tsx'
import Reports from '@/components/vendor/Report/Reports.tsx'
import Orders from '@/components/vendor/orders/Orders.tsx'

const TabPanel = (props: { tab: number }) => {
    const { tab } = props
    switch (tab) {
        case 0:
            return <MenuBuilder />
        case 1:
            return <Items />
        case 2:
            return <Ingredients />
        case 3:
            return <Reports />
        case 4:
            return <Orders />
        default:
            return null
    }
}
export default TabPanel
