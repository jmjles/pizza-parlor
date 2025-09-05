import Modal from '@/components/modal/Modal.tsx'
import Cart from '@/components/cart/Cart.tsx'
import { useDispatch } from 'react-redux'
import { toggleCartModal } from '@/store/slices.tsx'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectModal } from '@/store/selectors.tsx'

const CartModal = () => {
    const modals = useAppSelector(selectModal)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(toggleCartModal())
    }
    return (
        <Modal title={''} open={modals.cartModal} handleClose={handleClose}>
            <Cart />
        </Modal>
    )
}
export default CartModal
