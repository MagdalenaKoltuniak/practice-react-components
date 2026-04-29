import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class Article extends React.Component {
	state = {
		comments: [],
		content: '',
	};

	render() {
		const { title, body } = this.props;
		const { comments, content } = this.state;

		return (
			<article>
				<h1>{title}</h1>
				<p>{body}</p>
				<section>
					<form onSubmit={this.submitHandler}>
						<div>
							<label>
								<textarea
									style={{ minWidth: '300px', minHeight: '120px' }}
									name='content'
									value={content}
									onChange={this.changeHandler}
								/>
							</label>
						</div>
						<div>
							<input type='submit' value='dodaj komentarz' />
						</div>
					</form>
					<ul>{this.renderCommentsList()}</ul>
				</section>
			</article>
		);
	}

	addComment = comment => {
		this.setState(prev => ({
			comments: [...prev.comments, comment],
		}));
	};

	submitHandler = e => {
		e.preventDefault();
		const { comments, content } = this.state;

		if (!content.trim()) return;

		this.addComment(content);
		this.setState({ content: '' });
	};

	changeHandler = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	renderCommentsList = () => {
		const { comments } = this.state;
		return comments.map((comment, index) => {
			return <li key={index}>{comment}</li>;
		});
	};
}

root.render(
	<Article
		title='Programowanie jest super!'
		body='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo ipsum, eleifend vel quam eget, lobortis posuere arcu. In vitae eros in nisi sodales aliquam...'
	/>,
);
