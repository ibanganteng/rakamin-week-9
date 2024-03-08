/**
 *  @swagger
 *  tag:
 *   name: movies
 *   description: the movies managing API
 * /movies:
 *   get:
 *       summary: List all movies
 *       tags: [movies]
 *       responses:
 *          200:
 *             description: The list of the movies
 *             content:
 *                application/json:
 *                   schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/movies'
 *   post:
 *     summary: Create a new movies
 *     tags:  [movies]
 *     requestBody:
 *     content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/movies'
 *     responses:
 *       200:
 *          description: The created movies
 * /movies/{id}:
 *     get:
 *        summary: Get movies by movies id
 *        tags: [movies]
 *        parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: the movies id
 *        responses:
 *          200:
 *              description: the movies response by id
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/movies'
 *          
 *        
 *        400:
 *          description: the movies was not found
 *     put:
 *      summary: Update the movie by the id
 *      tags: [movies]
 *      parameters:
 *          -in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The movies id
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/movies'
 *      responses:
 *        200:
 *           description: the movies was updated
 *           content:
 *               application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/movies'
 *        404:
 *          description: the movies was not found
 *        500:
 *           description: some error happened
 *     delete:
 *         sumary: Remove the movie by id
 *         tags: [movies]
 *         parameters:
 *            - in: path
 *              name: id
 *              schema: 
 *                type: string
 *              required: true
 *              description: the movies id
 *         responses:
 *             200:
 *               description: the book was deleted
 *             404:
 *               description: the movie was not found
 *      
 *                   
 *          
 * 
 */


/**
 * @swagger
 *  components:
 *    schemas:
 *       movies:
 *          type: object
 *          required:
 *              -title
 *              -genres
 *              -year
 *          properties:
 *               id:
 *                  type: string
 *                  description: the auto-generated id of the movies
 *               title:
 *                   type: string
 *                   description: the title of the movies
 *               genres:
 *                    type: string
 *                    description: the genres of the movies
 *               year:  
 *                     type: string 
 *                     description: the date when the movies came out
 *          example:
 *             id: 1
 *             title: Recless
 *             genres: Comedy|Drama|Romance
 *             year: 2001
 *              
 * 
 *          
 * 
 * 
 *       
 *          
 */
