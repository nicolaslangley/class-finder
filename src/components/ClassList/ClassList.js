import React, { Component } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import Select from 'react-select';
import './ClassList.css';
import 'react-select/dist/react-select.css';
import Listing from './Listing/Listing';
import fire from '../../utils/fire';

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = { masterList: [], curList: []};
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.downloadClassList = this.downloadClassList.bind(this);
    this.downloadClassList();
  }

  updateClassList() {
    var firebaseProjectID = fire.options.authDomain.split('.')[0];
    var url = 'https://us-central1-' + firebaseProjectID + '.cloudfunctions.net/findClasses';
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responsetype = 'text';
    req.onload = function (e) {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
          console.log(req.response);
        }
      }
    };
    req.send();
  }

  downloadClassList() {
    var storage = fire.storage();
    // Create a reference from a Google Cloud Storage URI
    var gsReference = storage.refFromURL('gs://class-finder-541da.appspot.com/classlist.json');
    // Get the download URL
    gsReference.getDownloadURL().then(function (url) {
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.onload = function (event) {
        var result = JSON.parse(xhr.response);
        this.setState({ masterList: result, curList: result });
      }.bind(this);
      xhr.open('GET', url);
      xhr.send();
    }.bind(this)).catch(function (error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log("We've encountered an error: " + error.code)
    });
  }

  applyFilters(val) {
    if (val === null) {
      this.resetFilters();
      this.setState({ selectValue: "" });
    }
    var output = this.state.masterList.filter(function (obj) {
      return obj.school === val.label;
    });
    this.setState({ curList: output, selectValue: val });
  }

  resetFilters() {
    this.setState({ curList: this.state.masterList });
  }


  render() {
    // Options for selection
    const options = [
      { value: 'pnca', label: 'Pacific Northwest College of Art (PNCA)' },
      { value: 'mhcc', label: 'Mt. Hood Community College (MHCC)' },
      { value: 'pcc', label: 'Portland Community College (PCC)' },
      { value: 'ocac', label: 'Oregon College of Art and Craft (OCAC)' },
      { value: 'osu', label: 'Oregon State University (OSU)' }
    ];

    return (
      <div>
        <Select
          name="form-field-name"
          /* value={this.state.selectValue} */
          options={options}
          onChange={this.applyFilters}
          value={this.state.selectValue}
          /* onChange={this.applyFilters} */
        />
        <Button onClick={this.resetFilters}>
          Reset Filters
        </Button>
        <ListGroup>
          {this.state.curList.map(function (listValue) {
            return <Listing key={listValue.name}
              title={listValue.name}
              school={listValue.school} />
          })}
        </ListGroup>
        <Button onClick={this.updateClassList}>
          Update Class List
        </Button>
      </div>
    )
  }
}

export default ClassList;
