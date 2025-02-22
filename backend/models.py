from app import db

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.String(20), nullable=True)
    status = db.Column(db.String(20), default="pending", nullable=True)
    
    def to_json(self):
        return{
            "id" : self.id,
            "title" : self.title,
            "description" : self.description,
            "due_date" : self.due_date,
            "status" : self.status,
        }