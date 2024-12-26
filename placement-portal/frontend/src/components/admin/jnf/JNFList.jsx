import { DataTable } from '../../common/ui/Table/DataTable';

const columns = [
  { id: 'id', label: 'JNF ID' },
  { id: 'companyName', label: 'Company' },
  { id: 'position', label: 'Position' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created At' },
];

export const JNFList = ({ jnfs, onRowClick }) => {
  return (
    <DataTable 
      columns={columns}
      data={jnfs}
      onRowClick={onRowClick}
    />
  );
};