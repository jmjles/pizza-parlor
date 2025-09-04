import { Container, Grid2, Typography as Font } from '@mui/material'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
import ListItem from '@/components/Panel/ListItem.tsx'
import { StoreType } from '@/lib/db/model/store.ts'
import Panel, { PanelProps } from '@/components/Panel/Panel.tsx'
import { Property } from 'csstype'
import JustifyContent = Property.JustifyContent
import { MenuItemTypes } from '@/store/initialState.ts'
import { OrganizedIngredientsType } from '@/components/vendor/Ingedient/Ingredients.tsx'

const ListPanel = (props: ListPanelProps) => {
    const {
        title,
        list,
        handleBack,
        handleAction,
        onClick,
        actionBtn,
        emptyList,
        justifyContent,
        itemWidth = '400px',
        spacing = 0,
    } = props

    return (
        <Panel
            title={title}
            handleBack={handleBack}
            handleAction={handleAction}
            actionBtn={actionBtn}
        >
            <Container maxWidth="md">
                <Grid2
                    container
                    marginLeft="auto"
                    marginRight="auto"
                    marginBottom={3}
                    spacing={spacing}
                    justifyContent={
                        list.length == 0 ? 'center' : justifyContent
                    }
                >
                    {list.length === 0 ? (
                        <Font variant="h5">{emptyList}</Font>
                    ) : (
                        list.map((l, i) => (
                            <Grid2
                                key={i}
                                width={itemWidth}
                                flexGrow={0}
                                flexShrink={0}
                            >
                                <ListItem item={l} onClick={onClick} />
                            </Grid2>
                        ))
                    )}
                </Grid2>
            </Container>
        </Panel>
    )
}
interface ListPanelProps extends Omit<PanelProps, 'children'> {
    list: ListTypes[]
    onClick: any
    emptyList: string
    justifyContent?: JustifyContent
    itemWidth?: string
    spacing?: number
}
export type ListTypes =
    | MenuItemTypes
    | MenuCategoryType
    | StoreType
    | OrganizedIngredientsType

export default ListPanel
