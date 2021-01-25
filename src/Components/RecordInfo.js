import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@material-ui/core";

class RecordInfo extends React.Component {
  render() {
    const votes = this.props.record.details;

    const error = this.props.record.error;

    return (
      <div>
        {error ? (
          <div>
            We couldn't find a voting history for that person. Please make sure
            you were searching the correct chamber of Congress and that the
            person is a current member of Congress.
          </div>
        ) : (
          <div>
            <p>{`Here is the recent voting record for ${this.props.name}`}:</p>
            <Table stickyHeader={true}>
              <TableHead variant="header">
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Date of Vote</TableCell>
                  <TableCell>Voted</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {votes.map((vote, index) => {
                  const date = new Date(vote.date);

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {vote.bill.title ? vote.bill.title : vote.description}
                      </TableCell>
                      <TableCell>{date.toLocaleDateString()}</TableCell>
                      <TableCell>{vote.position}</TableCell>
                      <TableCell>{vote.result}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>{" "}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    record: state.record,
  };
};

export default connect(mapStateToProps)(RecordInfo);
