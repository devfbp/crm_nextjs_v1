"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "../PaginationSection";
import UserName from "./UserName";
import DeleteAction from "../action/Delete";
import EditAction from "../action/Edit";

interface Team {
  id?: number;
  team_name: string;
  team_leader_id: string;
  user_team_id: string;
}

const ScrollDataTableSection: React.FC = () => {
  const [dataList, setDataList] = useState<Team[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dataPerPage = 10;

  // Pagination calculation
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const currentData = useMemo(() => {
    return dataList.slice(indexOfFirstData, indexOfLastData);
  }, [dataList, indexOfFirstData, indexOfLastData]);

  const totalPages = Math.ceil(dataList.length / dataPerPage);

  // Fetch data
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user-team`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }

        const result = await response.json();
        setDataList(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body p-3">

          {/* Loading */}
          {loading && (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          )}

          {/* Error */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Table */}
          {!loading && !error && (
            <>
              <OverlayScrollbarsComponent>
                <div style={{ maxHeight: "300px" }}>
                  <Table
                    hover
                    id="componentDataTable"
                    className="table table-dashed table-hover digi-dataTable attendance-table table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Team Name</th>
                        <th>Team Leader</th>
                        <th>Team Members</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentData.length > 0 ? (
                        currentData.map((team, index) => (
                          <tr key={team.id ?? index}>
                            <td>{team.team_name}</td>
                            <td><UserName type="single" user_id={team?.team_leader_id} /></td>
                            <td><UserName type="multiple" user_id={team?.user_team_id} /></td>
                            <td>
                              <div className="btn-box">
                              <EditAction
                                  id={team?.user_team_id}
                                  page="user-team"
                                  type="link"
                                  link={`/user-team/${team?.user_team_id}/edit`}
                                  setRefresh={""}
                                  menu_id={15}
                              />
                              <DeleteAction
                                id={team?.user_team_id}
                                page="user-team"
                                reload={true}
                                menu_id={15}
                              />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="text-center py-3">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </OverlayScrollbarsComponent>

              {/* Pagination */}
              {totalPages > 1 && (
                <PaginationSection
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={setCurrentPage}
                  pageNumbers={[...Array(totalPages)].map((_, i) => i + 1)}
                  indexOfFirstData={indexOfFirstData}
                  indexOfLastData={indexOfLastData}
                  dataList={dataList}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollDataTableSection;