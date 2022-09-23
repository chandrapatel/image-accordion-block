/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes }) {

	const {
		headerText,
		headerImageUrl,
		headerImageAlt,
		headerImageId,
		accordion,
		accordionContent,
		contentImages
	} = attributes;

	const accordionContentHTML = [];

	for ( let i = 0; i < accordion; i++ ) {

		accordionContentHTML.push(
			(
				<div className="accordion-wrapper">
					<RichText.Content
						tagName="div"
						className="accordion-title"
						value={ ( accordionContent[i] ) ? accordionContent[i].title : "" }
					/>
					<RichText.Content
						tagName="div"
						className="accordion-content"
						value={ ( accordionContent[i] ) ? accordionContent[i].content : "" }
					/>
				</div>
			)
		);

	}

	return (
		<div { ...useBlockProps.save() }>
			<div className='accordion-column1'>
				<div className="accordion-header">
					<RichText.Content
						tagName="h3"
						value={ headerText }
					/> { /* Saves <h3>Content added in the editor...</h3> to the database for frontend display */ }
				</div>
				{accordionContentHTML}
			</div>
			<div className='accordion-column2'>
				<div className="accordion-header-image">
					<img src={ headerImageUrl } alt={ headerImageAlt } data-id={ headerImageId } />
				</div>
			</div>
		</div>
	);

}
