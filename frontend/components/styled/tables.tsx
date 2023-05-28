import styled from 'styled-components'

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    background-color: var(--background-light);
    border-radius: 10px;
    max-width: 400px;

`

const TableRow = styled.tr`
    border-bottom: 1px solid #D7D7D7;
    &:last-child {
        border-bottom: none;
    }
`

const TableCategory = styled.td`
    font-size: 1rem;
    margin: 0;
    padding: 0.65rem;
    padding-left: 1rem;

`
const TableDataText = styled.td`
    font-size: 1rem;
    margin: 0;
    padding-right: 1rem;
    color: var(--splash);
    text-align: right;
`

export { Table, TableRow, TableCategory, TableDataText }