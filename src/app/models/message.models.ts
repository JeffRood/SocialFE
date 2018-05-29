export class Message {
  constructor (
  public _id: String,
  public text: String,
  public viewed: String,
  public create_at: String,
  public emitter: String,
  public receiver: String
) {}
}
