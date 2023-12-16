import Table from "../table";
import { useState } from "react";
import Loader from "../loader";
import AddButton from "../buttons/addButton";
import UploadButton from "../buttons/uploadButton";

interface IListView {
  setFilParam?: any;
  handleFilter?: any;
  setSearchParam?: any;
  setSortParam?: any;
  filterOptions?: any;
  listName?: string;
  data?: any;
  column?: any;
  showCreate?: boolean;
  onCreate?: any;
  onRowClick?: any;
  createButton?: string;
  itemsPerPage?: any;
  setCurrentOffset?: any;
  isLoading?: any;
  paginationCount?: any;
  handlePage?: any;
  totalCounts?: number;
  setSelectedFilterOptionsCount?: any;
  selectedFilterOptionsCount?: number;
  showUpload?: boolean;
  handleUpload?: any;
  showSampleCSV?: boolean;
  showDeleteAll?: boolean;
  handleDeleteAll?: any;
  sampleCsvHeaders?: any;
  showFilter?: boolean;
}

export default function ListView(props: IListView) {
  const {
    filterOptions,
    setFilParam,
    setSearchParam,
    setSortParam,
    isLoading,
  } = props;
  const [searchText, setSearchText] = useState("");
  return (
    <div className="mt-5 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className=" flex items-center">
          <h1 className="text-3xl font-bold leading-6 text-gray-900">
            {props.listName}
          </h1>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="ml-3 flex h-[32px] w-[32px]  items-center justify-center rounded-[50%] bg-primary-600 p-2 text-white">
              <p>{props?.totalCounts}</p>
            </div>
          )}
          {props.showCreate && (
            <div className=" ml-3">
              <AddButton
                name={props.createButton}
                handleClick={props.onCreate}
              />
            </div>
          )}
          {props.showUpload && props?.data?.length == 0 && (
            <div className=" ml-3">
              <UploadButton handleClick={props.handleUpload} />
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flow-root overflow-x-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md">
          <div className="inline-block min-w-full align-middle">
            <div className="relative">
              <Table
                isLoading={filterOptions || setSearchParam || setSortParam}
                data={props.data}
                column={props.column}
                onClick={props.onRowClick}
                multipleSelect={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
