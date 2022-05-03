package graph

import "github.com/james-don/gqlgen-server/graph/model"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	todos []*model.Todo
	user *model.User
	posts []*model.Post
}
