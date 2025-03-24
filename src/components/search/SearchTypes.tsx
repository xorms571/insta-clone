import Icon from "../../Icon";
import { searchTypes } from "../../pages/Search";
type SearchTypesProps = {
  onTypeSelect: (type: string) => void;
};
const SearchTypes = ({ onTypeSelect }: SearchTypesProps) => {
  return (
    <ul className="flex gap-2 overflow-x-scroll px-2">
      {searchTypes.map((x, i) => (
        <li
          key={i}
          className="flex items-center cursor-pointer border py-1.5 px-3 rounded-md gap-1 shadow-md"
          onClick={() => onTypeSelect(x.title)}
        >
          {x.icon ? <Icon icon={x.icon} size="sm" /> : null}
          <b>{x.title}</b>
        </li>
      ))}
    </ul>
  );
};
export default SearchTypes;
