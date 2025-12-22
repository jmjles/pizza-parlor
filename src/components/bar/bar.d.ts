export type BarProps = (BarType & BarTabType) | BarType
export type BarType = {
    handleUser: () => void
    handleLogout: () => void
    handleMenu: () => void
    open: boolean
}

export interface BarTabType {
    tab: number
    handleTab: (tab: number) => void
}
