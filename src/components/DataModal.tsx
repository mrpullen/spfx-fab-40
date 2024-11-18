/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultButton, FontWeights, getTheme, IButtonStyles, IconButton, IIconProps, mergeStyleSets, Modal, PrimaryButton } from '@fluentui/react';
import { EditableGrid } from 'fluentui-editable-grid';
import React, { useEffect, useState } from 'react';

export interface IDataModalProps {
    itemId: string;
    index: number;
    labels: Array<any>;
    data: Array<any>;
    onSave: (data: { [key: string]: number }) => void;
}

export interface GridItemType {
    key: string;
    value: number;
}


const loadData = (props: IDataModalProps): Array<any> => {
    const curItems: Array<GridItemType> = [];

    const keys = props.labels;

    keys.forEach(key => {
        if(props.data && props.data.length > 0) {
            const dataItem = props.data.find((item) => { return item.key === key.label});
            if(dataItem) {
                curItems.push({
                    key: key.label,
                    value: dataItem.value
                });

            }
            else {
                curItems.push({
                    key: key.label,
                    value: 0
                });
            }
        }
        else {
            curItems.push({
                key: key.label,
                value: 0
            })
        }
    });

    return curItems;
}

const DataModal = (props: IDataModalProps): JSX.Element => {

    const [isOpen, showModal] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const columns = [
        {
            key: 'key',
            name: 'key',
            text: 'Key',
            editable: false,
            dataType: 'string',
            minWidth: 200,
            maxWidth: 200,
            isResizable: false,
            includeColumnInExport: true,
            includeColumnInSearch: true,
            applyColumnFilter: true,
            disableSort: false
        },
        {

            key: 'value',
            name: 'value',
            text: 'Value',
            editable: true,
            dataType: 'number',
            minWidth: 100,
            maxWidth: 100,
            isResizable: true,
            includeColumnInExport: true,
            includeColumnInSearch: true,
            applyColumnFilter: true
        }
    ];

    useEffect(() => {
        if(isOpen) {
            const items = loadData(props);
            setItems(items);
        }
        else {
            setItems([]);
        }
       
    }, [props.data, isOpen]);



    const cancelIcon: IIconProps = { iconName: 'Cancel' };
    
    const theme = getTheme();
    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
        },
        header: [
          
            theme.fonts.xxLarge,
            {
                flex: '1 1 auto',
                borderTop: `4px solid ${theme.palette.themePrimary}`,
                color: theme.palette.neutralPrimary,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 14px 24px',
            },
        ],
        heading: {
            color: theme.palette.neutralPrimary,
            fontWeight: FontWeights.semibold,
            fontSize: 'inherit',
            margin: '0',
        },
        body: {
            flex: '4 4 auto',
            padding: '0 24px 24px 24px',
            overflowY: 'hidden',
            selectors: {
                p: { margin: '14px 0' },
                'p:first-child': { marginTop: 0 },
                'p:last-child': { marginBottom: 0 },
            },
        },
    });

    const iconButtonStyles: Partial<IButtonStyles> = {
        root: {
          color: theme.palette.neutralPrimary,
          marginLeft: 'auto',
          marginTop: '4px',
          marginRight: '2px',
        },
        rootHovered: {
          color: theme.palette.neutralDark,
        },
      };
      


    return (<>
        <DefaultButton label="Enter Data" onClick={() => { showModal(true); }}>Open Data Modal</DefaultButton>
            
        <Modal isOpen={isOpen} onDismiss={() => { showModal(false); }} isBlocking={false}>
            <div className={contentStyles.header}>
            <h2 className={contentStyles.heading}>
                Data
            </h2>
            <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => {showModal(false)}}
            />
            </div>
            <div className={contentStyles.body}>
                <PrimaryButton label="Load Data" onClick={() => {
                    const items = loadData(props);
                    setItems(items);
                }}>Load Data</PrimaryButton>
                {isOpen && items.length > 0 && 
                    <EditableGrid id={props.index} columns={columns} enableGridReset={true} items={items} enableCellEdit={true} enableSave={true} onGridSave={(data: any) => { if (props.onSave) { props.onSave(data); } }} />
                }
            </div>
        </Modal>
    </>);
}


export default DataModal;