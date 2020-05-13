import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const TOGGLE_LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!){
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
`;

const Container = styled.div`
    height: 380px;
    width: 100%;
    `;
    
    const Poster = styled.div`
    border-radius: 7px;
    background-image: url(${props => props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default ({ id, bg, isLiked }) =>  {
    const [toggleLikeMovie] = useMutation(TOGGLE_LIKE_MOVIE, {
        variables: { 
            id: parseInt(id),
            isLiked
        }
    });
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg} />
            </Link>
            <button onClick={toggleLikeMovie}>{isLiked?"Unlike":"Like"}</button>
        </Container>
    );
}