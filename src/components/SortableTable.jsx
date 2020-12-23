import React from "react";
import { ReactSortable } from "react-sortablejs";
import { createUseStyles } from "react-jss";

import XButton from "./XButton";

const useStyles = createUseStyles({
  app: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  tableContainer: {
    borderRadius: 10,
    boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.15)",
  },
  table: {
    borderCollapse: "collapse",
  },
  item: {
    cursor: "move",
    margin: 2,
    background: "white",
    transition: "background 0.3s ease",
    "&:hover": {
      background: "#F7F7F7",
    },
  },
  ghostItem: {
    visibility: "hidden",
  },
  bodyHeader: {
    cursor: "default",
  },
  td: {
    textAlign: "left",
    borderBottom: "1px solid #CCC",
    padding: 15,
    paddingRight: 0,
  },
  tdFirst: {
    paddingLeft: 30,
  },
  tdLast: {
    paddingRight: 30,
    textAlign: "center",
  },
  th: {
    color: "white",
    background: "#6C7AE0",
    fontWeight: "bold",

    "& $tdFirst": {
      borderRadius: "10px 0px 0px 0px",
    },

    "& $tdLast": {
      borderRadius: "0px 10px 0px 0px",
    },
  },
  thChild: {
    border: "none",
  },
  tr: {},
  trLastChild: {
    border: "none !important",

    "&$tdFirst": {
      borderRadius: "0px 0px 0px 10px",
    },

    "&$tdLast": {
      borderRadius: "0px 0px 10px 0px",
    },
  },
});

const noop = () => {};

const sortableProps = (classes) => ({
  animation: 150,
  ghostClass: classes.ghostItem,
  filter: classes.filtered,
});

const TableRow = ({
  classes,
  className = "",
  childClassName = "",
  keys = [],
  data = {},
  dataEditable = false,
  render = {},
  onDataChange,
  children = [],
  ...props
}) => {
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
  }

  const renderCell = (index, key, tdChildren) => {
    let className = `${childClassName} ${classes.td}`;
    if (index === 0) className += " " + classes.tdFirst;
    if (index === keys.length + children.length - 1)
      className += " " + classes.tdLast;

    return (
      <td className={className} key={key}>
        {tdChildren}
      </td>
    );
  };

  return (
    <tr className={`${classes.tr} ${className}`} {...props}>
      {keys.map((key, index) => {
        const renderFunc = render[key] || (({ value }) => value);
        return renderCell(
          index,
          key,
          dataEditable
            ? renderFunc(
                { value: data[key] ?? key, onChange: onDataChange(key) },
                data
              )
            : renderFunc({ value: data[key] ?? key, onChange: noop }, data)
        );
      })}
      {children && children.length
        ? children.map((child, index) =>
            renderCell(index + keys.length, index, child)
          )
        : null}
    </tr>
  );
};

const SortableTable = ({
  header = [],
  keys,
  bodyHeader,
  data,
  render,
  setData,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <TableRow
            classes={classes}
            className={classes.th}
            childClassName={classes.thChild}
            keys={[...header, ""]}
          />
          <TableRow
            classes={classes}
            className={classes.item + " " + classes.bodyHeader}
            childClassName={data.length === 0 ? classes.trLastChild + " " : ""}
          >
            {bodyHeader}
          </TableRow>
        </thead>
        <ReactSortable
          tag="tbody"
          {...sortableProps(classes)}
          list={data}
          setList={setData}
        >
          {data.map((item, index) => (
            <TableRow
              key={item.id}
              classes={classes}
              className={classes.item}
              childClassName={
                index === data.length - 1 ? classes.trLastChild : ""
              }
              keys={keys}
              data={item}
              dataEditable
              onDataChange={(key) => (e) => {
                const value =
                  "checked" in e.target ? e.target.checked : e.target.value;
                return setData((oldData) => {
                  const newData = [...oldData];
                  newData[index][key] = value;
                  return newData;
                });
              }}
              render={render}
            >
              <XButton
                classes={classes}
                onClick={() =>
                  setData((theData) =>
                    theData.filter((entry) => entry.id !== item.id)
                  )
                }
              />
            </TableRow>
          ))}
        </ReactSortable>
      </table>
    </div>
  );
};

export default SortableTable;
