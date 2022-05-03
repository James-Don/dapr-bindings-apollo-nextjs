package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/big"
	"net/http"

	"github.com/james-don/gqlgen-server/graph/generated"
	"github.com/james-don/gqlgen-server/graph/model"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	nBig, err := rand.Int(rand.Reader, big.NewInt(27))
	if err != nil {
		panic(err)
	}
	n := nBig.Int64()
	todo := &model.Todo{
		Text: input.Text,
		ID:   fmt.Sprintf("T%d", n),
		User: &model.User{ID: input.UserID, Name: "user " + input.UserID},
	}
	r.todos = append(r.todos, todo)
	return todo, nil
}

// TODO Fetch data from DAPR http binding
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {

	htppBindingUrl := "http://127.0.0.1:3500/v1.0/bindings/jsonbinding"
	queryTemplate := `{
		"operation": "get",
		"metadata": {
		  "path": "/users/%s"
		}
	  }`
	query := fmt.Sprintf(queryTemplate, id)
	reqData := bytes.NewBuffer([]byte(query))
	client := &http.Client{}
	req, err := http.NewRequest("POST", htppBindingUrl, reqData)
	if (err != nil) {
		panic(err)
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("dapr-app-id", "apollogql")
	resp, err := client.Do(req)
	if (err != nil) {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if (err != nil) {
		panic(err)
	}
	fmt.Printf("Body : %s", body)
	user := model.User{}
	json.Unmarshal(body, &user)

	return &user, nil
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	return r.todos, nil
	// panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
