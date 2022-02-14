import { useState, useMemo } from 'react';

import BTable from 'react-bootstrap/Table';
import { useTable, useSortBy } from 'react-table';

import { itemsToRainbowSelectOptions } from './../utils/ytVideos_dataExtraction';
import { collectRecordsByBird, recordsToReactTableData } from './../utils/reMetadata_dataExtraction';
import { getItemsByKey } from './../utils/tools.js';
import './Records.css';
import birdRecordsInfo from './../utils/birdsInGoogleDrive/birdRecordsInfo.json';
// 載入資料建立表格
const Table = ({ columns, data }) => {
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, headerGroups, rows, prepareRow } = useTable({columns, data}, useSortBy);
	// Render the UI for your table
	return (
		<BTable striped hover variant="dark" responsive {...getTableProps()}>
			<thead>
			{headerGroups.map(headerGroup => (
				<tr {...headerGroup.getHeaderGroupProps()}>
				{headerGroup.headers.map(column => (
					// Add the sorting props to control sorting.
					<th {...column.getHeaderProps(column.getSortByToggleProps())}>
					{column.render('Header')}
					{/* Add a sort direction indicator */}
					<span>
					{column.isSorted ?
						column.isSortedDesc ? ' 🔽' : ' 🔼'
					 : ''}
					</span>
					</th>
				))}
				</tr>
			))}
			</thead>
			<tbody>
			{rows.map((row, rIdx) => {
				prepareRow(row);
				return (
					<tr {...row.getRowProps()}>
					{row.cells.map(cell => (
						<td {...cell.getCellProps()}>
						{cell.render('Cell')}
						</td>
					))}
					</tr>
				);
			})}
			</tbody>
		</BTable>
	);
}

const Records = () => {
	// 重複音檔鳥種
	const listBirds = getItemsByKey(birdRecordsInfo, 'bird', true);
	// 鳥種
	const [bird, setBird] = useState(listBirds[0]);
	const handleBirdChange = e => setBird(e.target.value);
	// 鳥種選項
	const birdSelect = itemsToRainbowSelectOptions(listBirds, "reBirdSelect", "鳥種", true, bird, handleBirdChange);
	// 該鳥種所有鳥音
	const recordsOfBird = collectRecordsByBird(bird);
	// 表格欄位
	const columns = useMemo(() => [
		{
			Header: 'Date',
			accessor: 'date'
		},
		{
			Header: 'Location',
			accessor: 'location'
		},
		{
			Header: 'Record',
			accessor: 'record'
		}
	], []);
	// 表格資料
	const data = useMemo(() => recordsToReactTableData(recordsOfBird), [recordsOfBird]);

	return (
		<main className="main h-100">
			{/* 鳥音容器 */}
			<div id="recordsContainer" className="h-100">
				{/* 鳥種選擇容器 */}
				<div id="reBirdSelectContainer" className="row mb-2">{birdSelect}</div>
				{/* 鳥音列表 */}
				<div id="reRecordsTable" className="row px-3">
					<Table columns={columns} data={data} />
				</div>
			</div>
		</main>
	);
}

export default Records;
