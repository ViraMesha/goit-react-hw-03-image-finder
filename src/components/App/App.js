import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import { fetchImages } from 'components/api-service/api';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { AppWrapper } from './App.styled';
import { Button } from 'components/Button/Button';

export default class App extends Component {
  state = {
    searchValue: '',
    largeImgUrl: '',
    images: [],
    isloading: false,
    error: null,
    page: 1,
    totalImages: 12,
    totalHits: 0,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        this.setState({ isloading: true, error: null });
        const data = await fetchImages(searchValue, page);
        if (data.totalHits > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            totalHits: data.totalHits,
          }));
        }
      } catch (error) {
        this.setState({ error: 'Error' });
      } finally {
        this.setState({ isloading: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleFormSubmit = searchValue => {
    this.setState({ searchValue, page: 1, images: [], totalImages: 12 });
  };

  setLargeImgUrl = url => {
    this.setState({ largeImgUrl: url });
  };

  onModalClose = () => {
    this.setState({ largeImgUrl: '' });
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.onModalClose();
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      totalImages: (prevState.totalImages += 12),
    }));
  };

  render() {
    const { images, error, isloading, largeImgUrl, totalImages, totalHits } =
      this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} setLargeImgUrl={this.setLargeImgUrl} />
        )}
        {isloading && <Loader />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {largeImgUrl && (
          <Modal img={largeImgUrl} onBackdropClick={this.onModalClose} />
        )}
        {totalHits > 0 && (
          <Button disabled={totalImages >= totalHits} onClick={this.loadMore} />
        )}
        <ToastContainer autoClose={2000} pauseOnHover />
      </AppWrapper>
    );
  }
}
