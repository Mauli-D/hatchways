import React from "react";


function serching(search) {
	return function (x) {
		return x.firstName.toLowerCase().includes(search.toLowerCase()) || x.lastName.toLowerCase().includes(search.toLowerCase()) || !search;
	}
}
export default class FetchStudent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			search: "",
			students: [],
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	};

	handleInputChange(event) {
		this.setState({ search: event.target.value })
	}

	async componentDidMount() {
		const url = "https://www.hatchways.io/api/assessment/students";
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ students: data.students, loading: false });
	}

	render() {

		const { search, students } = this.state
		if (this.state.loading) {
			return <div>loading...</div>;
		}

		if (!students.length) {
			return <div>didn't get a person</div>;
		}

		return (
			<div>
				<input className="form-control" type="text" placeholder="search" onChange={this.handleInputChange} value={search} />
				{students.filter(serching(search)).map(person => {
					var sum = 0;
					{
						person.grades.map(grade => {
							sum += parseInt(grade, 10)
						})
					}
					var avg = sum / person.grades.length;
					return (
						<div key={person.id}>
							<div className="row">
								<div className="col-lg-2 mx-auto mt-3">
									<img src={person.pic} />
								</div>
								<div className="col-lg-6 mx-auto mt-3">
									<h1 className="text-uppercase">{person.firstName + " " + person.lastName}</h1>
									<p className="small">Email: {person.email}<br />
							Company: {person.company} <br />
							Skill: {person.skill}<br />
							Average: {avg}%</p>
									<div id="collapse" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
										<div class="card-body">
											{person.grades.map(grade =>
												<div>
													<i>test[i]: {grade}%</i> <br />
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="col-lg-2 mx-auto mt-3">
									<div class="card">
										<div class="card-header" id="headingTwo">
											<h2 class="mb-0">
												<button type="button" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse">
													<i class="fa fa-plus"></i></button>
											</h2>
										</div>
									</div>
								</div>
							</div>
							<hr />
						</div>
					)
				})}
			</div>
		);
	}
}