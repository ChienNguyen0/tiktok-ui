import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import { ClearIcon, LoadingIcon, SearchIcon } from '~/icons';
import styles from './Search.module.scss';
import * as searchService from '~/services/searchService';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debounced);
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResults = () => {
        setShowResults(false);
    };

    const handleInputValue = (e) => {
        const searchInputValue = e.target.value;

        if (!searchInputValue.startsWith(' ')) {
            setSearchValue(searchInputValue);
        }
    };

    return (
        //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={showResults && searchResult.length > 0}
                interactive
                render={(attrs) => (
                    <div className={cx(`search-results`)} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx(`search-title`)}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResults}
            >
                <div className={cx(`search`)}>
                    <input
                        ref={inputRef}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleInputValue}
                        onFocus={(e) => setShowResults(true)}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx(`clear`)} onClick={handleClear}>
                            <ClearIcon />
                        </button>
                    )}

                    {loading && <LoadingIcon className={cx(`loading`)} />}
                    <button className={cx(`search-btn`)} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
