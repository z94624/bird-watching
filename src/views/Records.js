import { useState, useMemo } from 'react';

import BTable from 'react-bootstrap/Table';
import BPagination from 'react-bootstrap/Pagination';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';

import { itemsToRainbowSelectOptions } from './../utils/ytVideos_dataExtraction';
import { collectRecordsByBird, recordsToReactTableData } from './../utils/reMetadata_dataExtraction';
import { getItemsByKey } from './../utils/tools.js';
import './Records.css';
import birdRecordsInfo from './../utils/birdsInGoogleDrive/birdRecordsInfo.json';
// Define a default UI for filtering
const DefaultColumnFilter = ({
	column: { filterValue, preFilteredRows, setFilter }
}) => (
	<input
		value={filterValue || ''}
		onChange={e => {
			setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
		}}
	/>
);
// 模糊查詢方法
const fuzzyTextFilterFn = (rows, id, filterValue) => matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;
// 載入資料建立表格
const Table = ({ columns, data }) => {
	// 查詢方法
	const filterTypes = useMemo(() => ({
		// 模糊查詢
		fuzzyText: fuzzyTextFilterFn,
		// 嚴謹查詢(按照出現順序)
		text: (rows, id, filterValue) => rows.filter(row => {
			const rowValue = row.values[id];
			return rowValue !== undefined
				? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
				: true;
		}),
	}), []);
	// 預設篩選器
	const defaultColumn = useMemo(() => ({
		// Let's set up our default Filter UI
      	Filter: DefaultColumnFilter
	}), []);
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps, headerGroups, prepareRow,
		page, canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, setPageSize, state: { pageIndex, pageSize }
	} = useTable(
		{
			columns, data, defaultColumn, filterTypes,
			initialState: { pageIndex: 0, pageSize: 5 }
		},
		useFilters, useSortBy, usePagination);
	// Render the UI for your table
	return (
		<>
			<BTable striped hover variant="dark" responsive {...getTableProps()}>
				<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map((column, cIdx) => {
						return cIdx !== 2 ? ( // Date, Location = Sortable
								// Add the sorting props to control sorting.
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
									{/* Add a sort direction indicator */}
									<span>
									{column.isSorted ?
										column.isSortedDesc ? ' 🔽' : ' 🔼'
									 : ''}
									</span>
									{/* Render the columns filter UI */}
	                  				{cIdx === 1 ? <div>{column.canFilter ? column.render('Filter') : null}</div> : <></>}
								</th>
							) : ( // Record = Unsortable
								<th {...column.getHeaderProps()}>
								{column.render('Header')}
								</th>
							)
					})}
					</tr>
				))}
				</thead>
				<tbody>
				{page.map((row, rIdx) => {
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
			{/* Pagination */}
			<div className="pagination justify-content-center">
				<a href="#" className={`${!canPreviousPage && "disabled"}`} onClick={() => gotoPage(0)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
						<path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
					</svg>
				</a>
				{pageIndex+1 - 2 > 0 &&
					<a href="#" onClick={() => gotoPage(pageIndex-2)}>{pageIndex-1}</a>
				}
				{pageIndex+1 - 1 > 0 &&
					<a href="#" onClick={() => gotoPage(pageIndex-1)}>{pageIndex}</a>
				}
				<a href="#" className="active">{pageIndex+1}</a>
				{pageIndex+1 + 1 <= pageCount &&
					<a href="#" onClick={() => gotoPage(pageIndex+1)}>{pageIndex+2}</a>
				}
				{pageIndex+1 + 2 <= pageCount &&
					<a href="#" onClick={() => gotoPage(pageIndex+2)}>{pageIndex+3}</a>
				}
				<a href="#" className={`${!canNextPage && "disabled"}`} onClick={() => gotoPage(pageCount-1)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
						<path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
					</svg>
				</a>
			</div>
		</>
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
			accessor: 'location',
			filter: 'fuzzyText'
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
