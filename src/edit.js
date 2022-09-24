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
import { PanelBody, RangeControl } from '@wordpress/components';

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
		accordion,
		accordionContent,
		accordionImages
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
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => {

							let selectedMedia = [];

							// We need to save selected images upto number of accordion plus header image.
							for ( let i = 0; i < ( accordion + 1); i++ ) {

								selectedMedia[i] = {
									url: media[i].url,
									alt: media[i].alt,
									id: media[i].id,
								}

							}

							setAttributes( { accordionImages: selectedMedia } );

						} }
						allowedTypes={ [ 'image' ] }
						multiple="true"
						value={ accordionImages.map( ( accordionImage ) => accordionImage.id ) }
						render={ ( { open } ) => {

							return (
								<div className="accordion-images">
									{ accordionImages.length > 0 && (
										accordionImages.map( ( accordionImage, index ) => {
											return (
												<img key={index} src={ accordionImage.url } alt={ accordionImage.alt } data-id={ accordionImage.id } data-index={ index } onClick={ open } />
											)
										} )
									) }

									{ accordionImages.length === 0 && (
										<img src='https://via.placeholder.com/684x668' onClick={ open } />
									) }
								</div>
							);
						} }
					/>
				</MediaUploadCheck>
			</div>
		</div>
	);

}
