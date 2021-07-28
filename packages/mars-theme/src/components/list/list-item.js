import { connect, styled } from "frontity";
import Link from "../link";
import FeaturedMediaNewArticles from "../featured-media-new-articles";
import ReadingTime from '../../../img/reading-time.svg';


/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */


const Item = ({ state, item }) => {
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  const readingTime = require('reading-time');
  const stats = readingTime(item.content.rendered);

  return (

    <article className={item.sticky.toString()}>
        {/*
         * If the want to show featured media in the
         * list of featured posts, we render the media.
         */}
         <FeaturedImage>
            {state.theme.featured.showOnList && (
              <Link link={item.link}><FeaturedMediaNewArticles id={item.featured_media} /></Link>
            )}
        </FeaturedImage>
        <PostMeta>
          <Link link={item.link}>
            <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
          </Link>

            <div className="otherMeta">
                <div className="PostCat">
                    {item.categories.map( category => {
                        const cat = state.source.category[category]
                        return (
                            <Link key={cat.id} link={cat.link}>{cat.name}</Link>
                        )
                    })}
                </div>
                <div className="PostTime">
                <img src={ReadingTime} alt="Prairie" style={{ width: '16px', height: '16px'}}/> <span>{stats.text}</span>
                </div>
            </div>


        </PostMeta>

      {/* <div> */ }
        {/* If the post has an author, we render a clickable author text. */}
        {/*
        {author && (
          <StyledLink link={author.link}>
            <AuthorName>
              By <b>{author.name}</b>
            </AuthorName>
          </StyledLink>
        )}
        */}
        {/*
        <PublishDate>
          {" "}
          on <b>{date.toDateString()}</b>
        </PublishDate>
        */}
      {/* </div> */}



      {/* If the post has an excerpt (short summary text), we render it */}
      {/*
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
      */}
    </article>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const Title = styled.h3`
  font-size: 1rem; /* 16px */
  font-weight: 400;
  letter-spacing: -0.03em;
  margin: 0;
  padding-top: 14px;
  padding-bottom: 12px;
  box-sizing: border-box;
  min-width: 304px;
  color: #183F4F;
  transition: all .5s linear;

  &:hover {
      color: #2A440E;
  }

  @media (max-width: 950px) {
      min-width: 100%;
  }
`;

const AuthorName = styled.span`
    color: #456772;
    font-weight: 500;
    font-size: 0.75rem;
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const FeaturedImage = styled.span`
    img {
        height: 80px;
        width: 80px;
    }
    @media (max-width: 1280px) {
        img {
            height: 60px;
            width: 120px;
        }
    }
    @media (max-width: 600px) {
        img {
            height: 60px;
            width: 100px;
        }
    }
`;

const PostMeta = styled.div`
    padding-left: 16px;

    @media (max-width: 1280px) {
        width: 100%;
    }

    .otherMeta {
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: center;

        @media (max-width: 1280px) {
            grid-template-columns: 1fr;
            grid-row-gap: 5px;
        }
        @media (max-width: 1025px) {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        @media (max-width: 550px) {
            display: grid;
            grid-template-columns: 1fr;
            grid-row-gap: 5px;
        }
    }
    @media (max-width: 950px) {
        .PostCat, .PostTime {
            width: auto;
        }
    }
    .PostCat a {
        color: #6D9147;
        text-transform: uppercase;
        font-size: 0.75rem;
        font-weight: 700;
        transition: all .5s linear;
    }
    .PostCat a:hover {
        color: #2A440E;
    }
    .PostCat a::after {
        content: '.';
        line-height: 10px;
        padding: 0px 5px;
        vertical-align: top;
        font-size: 20px;
    }
    .PostCat a:last-child::after {
        content: '';
    }
    .PostTime span {
        font-size: 0.75rem;
    }
    .PostTime img {
        vertical-align: sub;
        margin-right: 6px;
    }
    .PostTime span {
        font-size: 0.75rem;
        font-weight: 400;
        color: #456772;
    }
`;
