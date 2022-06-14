import React from "react"
import { ColumnID, SheetData } from "../../../types";
import { getDisplayColumnHeader } from "../../../utils/columnHeaders";
import DropdownItem from "../../elements/DropdownItem";
import Select from "../../elements/Select";
import TextButton from "../../elements/TextButton";
import XIcon from "../../icons/XIcon";
import Col from "../../spacing/Col";
import Row from "../../spacing/Row";
import Spacer from "../../spacing/Spacer";
import { MergeParams } from "./MergeTaskpane";
import { getFirstSuggestedMergeKeys } from "./mergeUtils";



const MergeKeysSelectionSection = (props: {
    params: MergeParams,
    setParams: React.Dispatch<React.SetStateAction<MergeParams>>,
    sheetDataArray: SheetData[],
    error: string | undefined;
}): JSX.Element => {

    const sheetDataOne = props.sheetDataArray[props.params.sheet_index_one];
    const sheetDataTwo = props.sheetDataArray[props.params.sheet_index_two];

    return (
        <div className="light-gray-container">
            <Row suppressTopBottomMargin>
                <Col>
                    <p className="text-header-3">
                        Match rows where:
                    </p>
                </Col>
            </Row>
            {props.params.merge_key_column_ids.map(([mergeKeyColumnIDOne, mergeKeyColumnIDTwo], index) => {
                return (
                    <Row justify="space-between" align="center">
                        <Col>
                            <Select
                                value={mergeKeyColumnIDOne}
                                onChange={(columnID: ColumnID) => {
                                    props.setParams(prevParams => {
                                        const newMergeKeys = [...prevParams.merge_key_column_ids];
                                        newMergeKeys[index][0] = columnID
                                        return {
                                            ...prevParams,
                                            merge_key_column_ids: newMergeKeys
                                        }
                                    })
                                }}
                                width='medium'
                                searchable
                            >
                                {Object.entries(sheetDataOne.columnIDsMap || {}).map(([columnID, columnHeader]) => {
                                    return (
                                        <DropdownItem
                                            key={columnID}
                                            id={columnID}
                                            title={getDisplayColumnHeader(columnHeader)}
                                        />
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col className="text-header-3">
                            =
                        </Col>
                        <Col>
                            <Select
                                value={mergeKeyColumnIDTwo}
                                onChange={(columnID: ColumnID) => {
                                    props.setParams(prevParams => {
                                        const newMergeKeys = [...prevParams.merge_key_column_ids];
                                        newMergeKeys[index][1] = columnID
                                        return {
                                            ...prevParams,
                                            merge_key_column_ids: newMergeKeys
                                        }
                                    })
                                }}
                                width='medium'
                                searchable
                            >
                                {Object.entries(sheetDataTwo.columnIDsMap || {}).map(([columnID, columnHeader]) => {
                                    return (
                                        <DropdownItem
                                            key={columnID}
                                            id={columnID}
                                            title={getDisplayColumnHeader(columnHeader)}
                                        />
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <XIcon
                                onClick={() => {
                                    props.setParams(prevParams => {
                                        const newMergeKeys = [...prevParams.merge_key_column_ids];
                                        newMergeKeys.splice(index, 1)
                                        return {
                                            ...prevParams,
                                            merge_key_column_ids: newMergeKeys
                                        }
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                )
            })}
            {props.error !== undefined && 
                <p className='text-color-error'>
                    {props.error}
                </p>    
            }
            <Spacer px={10}/>
            <TextButton 
                variant="dark"
                onClick={() => {
                    props.setParams(prevParams => {
                        const newMergeKeys = [...prevParams.merge_key_column_ids];
                        const newSuggestedMergeKeys = getFirstSuggestedMergeKeys(props.sheetDataArray, props.params.sheet_index_one, props.params.sheet_index_two, props.params.merge_key_column_ids);
                        
                        if (newSuggestedMergeKeys) {
                            newMergeKeys.push(newSuggestedMergeKeys);
                        }
                        
                        return {
                            ...prevParams,
                            merge_key_column_ids: newMergeKeys
                        };
                    })
                }}
            >
                + Add Merge Keys
            </TextButton>
        </div>
    )
}

export default MergeKeysSelectionSection;