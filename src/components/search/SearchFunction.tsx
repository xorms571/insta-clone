import { IoSearchOutline } from "react-icons/io5";
import { IoIosQrScanner } from "react-icons/io";
import Icon from "../../Icon";
type SearchFunctionProps = {
  query: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
};
const SearchFunction = ({
  query,
  onSearch,
  onSearchSubmit,
}: SearchFunctionProps) => {
  return (
    <div className="flex items-center w-full justify-center gap-2 px-2 pt-2">
      <div className="bg-neutral-100 w-11/12 flex items-center p-2 rounded-lg gap-1 shadow-inner">
        <div className="cursor-pointer px-1" onClick={onSearchSubmit}>
          <Icon icon={<IoSearchOutline color="#666" />} size="sm" />
        </div>
        <input
          type="text"
          value={query}
          onChange={onSearch}
          className="w-full bg-neutral-100 text-neutral-500"
          placeholder="검색"
        />
      </div>
      <div className="cursor-pointer">
        <Icon icon={<IoIosQrScanner />} size="md" />
      </div>
    </div>
  );
};
export default SearchFunction;
