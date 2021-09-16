// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
  setCategory,
  setDifficult,
  setAllCategory,
  setNumberOfQuestions,
} from '../redux/actions/settings';

// Services
import { fetchCategories } from '../services/apiTrivia';

// Children
import { GoHome } from '../components';

// Styles
import '../styles/Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    const { value, category, difficult, allcategories } = this.props;
    this.state = {
      allcategories,
      value,
      category,
      difficult,
    };

    this.handleChange = this.handleChange.bind(this);
    this.mapAllCategories = this.mapAllCategories.bind(this);
    this.setAllcategories = this.setAllcategories.bind(this);
    this.renderValues = this.renderValues.bind(this);
    this.renderDifficulty = this.renderDifficulty.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.setAllcategories();
  }

  async setAllcategories() {
    const { allcategories, configGameAllCategoriesDispatch } = this.props;
    if (allcategories.length === 0) {
      const response = await fetchCategories();
      configGameAllCategoriesDispatch(response);
      this.setState({ allcategories: response });
    } else {
      const { value, category, difficult } = this.props;
      this.setState({ allcategories, value, category, difficult });
    }
  }

  save() {
    const {
      configGameCategoryDispatch,
      configGameNumberDispatch,
      configGameDifficultDispatch,
      history,
    } = this.props;
    const { category, value, difficult } = this.state;
    configGameCategoryDispatch(category);
    configGameDifficultDispatch(difficult);
    configGameNumberDispatch(value);
    history.push('/');
  }

  mapAllCategories(param) {
    return param.map(({ id, name }) => (
      <option
        key={ id }
        value={ id }
      >
        {name}
      </option>));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderDifficulty() {
    const { difficult } = this.state;
    return (
      <label className="SelectDifficulty" htmlFor="difficult">
        Select Difficulty:
        <select
          select={ difficult }
          id="difficult"
          className="form-select"
          name="difficult"
          value={ difficult }
          onChange={ this.handleChange }
        >
          <option value="Any Difficulty">
            Any Difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    );
  }

  renderValues() {
    const { value } = this.state;
    return (
      <label className="SelectQuantity" htmlFor="value">
        Number of Questions:
        <select
          id="value"
          className="form-select"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </label>);
  }

  render() {
    const { allcategories, category } = this.state;
    return (
      <section className="Settings">
        <div className="Settings-Wrapper">
          <h1 data-testid="settings-title">Configurações</h1>
          <div className="Settings-Fieldset">
            {this.renderValues()}
            <label className="SelectCategory" htmlFor="categorias">
              Select Category:
              <select
                id="categorias"
                className="form-select"
                name="category"
                value={ category }
                onChange={ this.handleChange }
              >
                {this.mapAllCategories(allcategories)}
              </select>
            </label>
            {this.renderDifficulty()}
          </div>

          <div className="Settings-Btns">
            <GoHome />
            <button
              type="button"
              className="btn btn-success"
              onClick={ this.save }
            >
              Salvar
            </button>
          </div>
        </div>
      </section>
    );
  }
}

Settings.propTypes = {
  allcategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  difficult: PropTypes.string.isRequired,
  configGameAllCategoriesDispatch: PropTypes.func.isRequired,
  configGameCategoryDispatch: PropTypes.func.isRequired,
  configGameNumberDispatch: PropTypes.func.isRequired,
  configGameDifficultDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  value: state.settings.numberOfQuestions,
  category: state.settings.category,
  difficult: state.settings.difficult,
  allcategories: state.settings.allCategories,
});

const mapDispatchToProps = (dispatch) => ({
  configGameCategoryDispatch: (payload) => dispatch(setCategory(payload)),
  configGameNumberDispatch: (payload) => dispatch(setNumberOfQuestions(payload)),
  configGameDifficultDispatch: (payload) => dispatch(setDifficult(payload)),
  configGameAllCategoriesDispatch: (payload) => dispatch(setAllCategory(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
