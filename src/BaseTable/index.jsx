import React, { useState } from "react";
import { Radio,Table } from "antd";

const ETable = (props) => {
    const [selectionType, setSelectionType] = useState('radio');
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            props.filterTableInfo(selectedRows[0]);
        },
    };
    <Radio.Group
        onChange={({ target: { value } }) => {
            setSelectionType(value);
        }}
        value={selectionType}
    >
    </Radio.Group>
    
    const renderTable = () => {
        return <Table
            bordered
            pagination={true}
            {...props}
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
        />
    }
    return (
        <div>
            {renderTable()}
        </div>
    );
}

export default ETable;