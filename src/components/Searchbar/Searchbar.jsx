import { Component } from 'react';
import toast from 'react-hot-toast';
import { MdYoutubeSearchedFor } from 'react-icons/md';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onChangeInput = evt => {
    this.setState({ query: evt.currentTarget.value });
  };


  onSubmitForm = evt => {
    evt.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    if (query.trim() === '') {
      toast.error('Enter a search term.');
      return;
    }

    onSubmit(query);
  };

  render() {
    const { query } = this.state;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.onSubmitForm}>
          <SearchFormBtn type="submit">
            <MdYoutubeSearchedFor size={30}/>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.onChangeInput}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
