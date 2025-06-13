import React, { forwardRef } from "react";
import {
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
} from "../../../../api/wpApi";
import "./TariffTable.scss";

interface TariffFlags {
  solo: boolean;
  team: boolean;
  enterprise: boolean;
}

interface LineData {
  tariffs: TariffFlags;
  [key: string]: unknown;
}

interface TitleGroup {
  title_name: string;
  [lineKey: string]: unknown; 
}

interface ACFData {
  titles: Record<string, TitleGroup>;
}


const TariffTable = forwardRef<HTMLDivElement>((props, ref) => {
  const slug = 'tariff-table';
  const {
    data: postFromAll,
    isLoading: isAllLoading,
    isFetching: isAllFetching,
  } = useGetAllPostsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      data: data?.find((p) => p.slug === slug),
      isLoading,
      isFetching,
    }),
  });

  const {
    data: singlePostArray,
    isLoading: isSingleLoading,
    isFetching: isSingleFetching,
  } = useGetPostBySlugQuery(slug, {
    skip: !!postFromAll,
  });

  const post = postFromAll || singlePostArray?.[0];
  const loading = isAllLoading || isSingleLoading;
  const fetching = isAllFetching || isSingleFetching;

  if (loading || fetching) return <div className="loading-spinner"></div>;
  if (!post) return <div className="no-data">Ei tietoja</div>;

  const acf = post.acf as unknown as ACFData;
  const titles = acf.titles;

  return (
    <div className="tariff-table-container" ref={ref}>
      <div className="tariff-table-wrapper">
        <table className="tariff-table">
          <thead>
            <tr>
              <th className="feature-column">Ominaisuus</th>
              <th>Solo</th>
              <th>Team</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(titles).map(([groupKey, groupValue]) => (
              <React.Fragment key={groupKey}>
                <tr className="group-row">
                  <td colSpan={4} className="group-title">
                    {groupValue.title_name}
                  </td>
                </tr>

                {Object.entries(groupValue)
                  .filter(([k]) => k !== 'title_name')
                  .map(([lineKey, rawLineData]) => {
                    const lineData = rawLineData as LineData;
                    const lineName = Object.values(lineData).find(
                      (v): v is string => typeof v === 'string'
                    ) || '';
                    const { tariffs } = lineData;

                    return (
                      <tr key={lineKey} className="feature-row">
                        <td className="feature-name">{lineName}</td>
                        <td className={tariffs.solo ? 'check' : 'cross'}>
                          {tariffs.solo ? '✓' : '✕'}
                        </td>
                        <td className={tariffs.team ? 'check' : 'cross'}>
                          {tariffs.team ? '✓' : '✕'}
                        </td>
                        <td className={tariffs.enterprise ? 'check' : 'cross'}>
                          {tariffs.enterprise ? '✓' : '✕'}
                        </td>
                      </tr>
                    );
                  })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TariffTable;