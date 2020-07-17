import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import $ from 'jquery'

import Home from './components/hatchways'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
  componentDidMount() {

    $(document).ready(function(){
      // Add minus icon for collapse element which is open by default
      // $(".collapse.show").each(function(){
      //   $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
      // });
      
      // Toggle plus minus icon on show hide of collapse element
      $(".collapse").on('show.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
      }).on('hide.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
      });
  });
}
}

export default App;
