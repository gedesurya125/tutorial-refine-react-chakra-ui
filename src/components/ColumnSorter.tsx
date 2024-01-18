import { IconButton } from "@chakra-ui/react";
import { IconChevronDown, IconSelector, IconChevronUp } from "@tabler/icons";
import type { Column, SortDirection } from "@tanstack/react-table";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
  column,
}) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <IconButton
      aria-label="Sort"
      size="xs"
      icon={<ColumnSorterIcon sorted={sorted} />}
      onClick={column.getToggleSortingHandler()}
    />
  );
};

const ColumnSorterIcon = ({ sorted }: { sorted: false | SortDirection }) => {
  if (sorted === "asc") return <IconChevronDown size={18} />;
  if (sorted === "desc") return <IconChevronUp size={18} />;
  return <IconSelector size={18} />;
};
