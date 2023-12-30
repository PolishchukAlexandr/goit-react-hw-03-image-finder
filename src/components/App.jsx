import {useState} from 'react';

import galleryApi from '../services/gallery-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ErrorMessage from './ErrorMessage/ErrorMessage';

export const App = () => {
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [gallery, setGallery] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);


  componentDidUpdate(prevProps, prevState); {
  const { page, search } = this.state;
  
  if (prevState.search !== search || prevState.page !== page) {
    this.handleAPI();
    }
  }


  const onSubmitForm = state => {
    if (!state) {
      return setState({
        status: 'rejected',
        message: 'string must not be empty',
      });
    }
    setState({
      search: state,
      gallery: [],
      page: 1,
      showBtn: false,
    });
  };

  const onSelected = e => {
    if (e.target.src === undefined) {
      return;
    }
    setState({ selected: { url: e.target.src, alt: e.target.alt } });
  };

  const closeModal = () => {
    setState({ selected: null });
  };

  const handleLoadMore = () => {
    setPage(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  const handleAPI = () => {
    const { search, page } = this.state;
    this.setState({ loader: true, status: 'pending ' });

    galleryApi
      .fetchGallery(page, search)
      .then(data => {
        if (data.total === 0) {
          return this.setState({
            status: 'rejected',
            message: 'Nothing found for your request :(',
          });
        }
        return this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...data.hits],
            status: 'resolved',
            showBtn: page < Math.ceil(data.total / 12),
          };
        });
      })
      .catch(() =>
        this.setState({
          status: 'rejected',
          message: 'Ooops... something went wrong :(',
        })
      )
      .finally(() => this.setState({ loader: false }));
  };

  render();
  {
    const { status, message, gallery, loader, showBtn, selected } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitForm} />

        {status === 'pending' && <Loader />}

        {status === 'rejected' && <ErrorMessage message={message} />}

        {status === 'resolved' && (
          <>
            <ImageGallery onSelected={this.onSelected}>
              {gallery !== null &&
                gallery.map(({ id, largeImageURL, tags }) => (
                  <ImageGalleryItem
                    key={id}
                    url={largeImageURL}
                    tags={tags}
                    id={id}
                  />
                ))}
            </ImageGallery>

            {status === 'resolved' && showBtn && (
              <Button gallery={gallery} onClick={this.handleLoadMore} />
            )}
          </>
        )}

        {selected && <Modal img={selected} closeModal={this.closeModal} />}
      </>
    );
  }
}