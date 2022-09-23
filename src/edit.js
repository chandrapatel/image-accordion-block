/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 * @see https://developer.wordpress.org/block-editor/reference-guides/richtext/
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar/
 */
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import { PanelBody, Button, RangeControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
} ) {

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

		if ( ! accordionContent[i] ) { accordionContent[i] = {} };

		accordionContentHTML.push(
			(
				<div className="accordion-wrapper">
					<RichText
						tagName="div"
						className="accordion-title"
						value={ ( accordionContent[i] ) ? accordionContent[i].title : "" }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						onChange={ ( title ) => {  accordionContent[i]['title'] = title; setAttributes( { accordionContent: accordionContent } ) } }
						placeholder={ __( 'Accordion Title...', 'image-accordion-block' ) }
					/>
					<RichText
						tagName="div"
						className="accordion-content"
						value={ ( accordionContent[i] ) ? accordionContent[i].content : "" }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						onChange={ ( content ) => { accordionContent[i]['content'] = content; setAttributes( { accordionContent: accordionContent } ) } }
						placeholder={ __( 'Accordion Content...', 'image-accordion-block' ) }
					/>
				</div>
			)
		);

	}

	return (
		<div { ...useBlockProps() }>

			<InspectorControls key="block-settings">
				<PanelBody title={ __( 'Settings', 'image-accordion-block' ) }>
					<RangeControl
						label="Accordion"
						value={ accordion }
						onChange={ ( value ) => setAttributes( { accordion: parseInt( value ) } ) }
						min={ 2 }
						max={ 4 }
					/>
				</PanelBody>
			</InspectorControls>

			<div className='accordion-column1'>
				<div className="accordion-header">
					<RichText
						tagName="h3" // The tag here is the element output and editable in the admin
						value={ headerText } // Any existing content, either from the database or an attribute default
						allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ ( content ) => setAttributes( { headerText: content } ) } // Store updated content as a block attribute
						placeholder={ __( 'Header Text...', 'image-accordion-block' ) } // Display this text before any content has been added by the user
					/>
				</div>
				{accordionContentHTML}
			</div>

			<div className='accordion-column2'>
				<div className="accordion-header-image">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes(
									{
										headerImageUrl: media.url,
										headerImageAlt: media.alt,
										headerImageId: media.id,
									}
								)
							}
							allowedTypes={ [ 'image' ] }
							value={ headerImageId }
							render={ ( { open } ) => {
								return (
									<>
										{ headerImageUrl && (
											<img src={ headerImageUrl } alt={ headerImageAlt } data-id={ headerImageId } onClick={ open } />
										) }
										{ ! headerImageUrl && (
											<img src='https://via.placeholder.com/150/' onClick={ open } />
										) }
										{/* <Button onClick={ open } className="button button-secondary">
											{ __( 'Open Media Library', 'image-accordion-block' ) }
										</Button> */}
									</>
								);
							} }
						/>
					</MediaUploadCheck>
				</div>
			</div>
		</div>
	);

}
