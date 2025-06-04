from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, date

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///focus.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # top3, todo, distractions
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    task_date = db.Column(db.Date, default=date.today)
    completed = db.Column(db.Boolean, default=False)
    position = db.Column(db.Integer, default=0)  # for drag-to-reorder

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    note_date = db.Column(db.Date, default=date.today)

@app.route("/focus", methods=["GET", "POST"])
def focus():
    if request.method == "POST":
        section = request.form.get("section")
        item = request.form.get("item")
        task_id = request.form.get("task_id")
        action = request.form.get("action")

        if section == "delete":
            task = Task.query.get(task_id)
            if task:
                db.session.delete(task)
                db.session.commit()

        elif section == "edit":
            task = Task.query.get(task_id)
            if task and item:
                task.content = item
                db.session.commit()

        elif section == "complete":
            task = Task.query.get(task_id)
            if task:
                task.completed = not task.completed
                db.session.commit()

        elif section == "notes":
            Note.query.filter_by(note_date=date.today()).delete()
            db.session.add(Note(content=item))
            db.session.commit()

        else:
            max_position = db.session.query(db.func.max(Task.position)).filter_by(category=section, task_date=date.today()).scalar() or 0
            db.session.add(Task(content=item, category=section, position=max_position + 1))
            db.session.commit()

        return redirect(url_for("focus"))

    # Handle GET request and editing
    editing_id = request.args.get("edit_id", type=int)

    # Only show today's tasks/notes
    top3 = Task.query.filter_by(category="top3", task_date=date.today()).order_by(Task.position).all()
    todo = Task.query.filter_by(category="todo", task_date=date.today()).order_by(Task.position).all()
    distractions = Task.query.filter_by(category="distractions", task_date=date.today()).order_by(Task.position).all()
    note = Note.query.filter_by(note_date=date.today()).first()

    return render_template("focused.html", top3=top3, todo=todo, distractions=distractions, note=note, editing_id=editing_id)

@app.route("/reorder", methods=["POST"])
def reorder():
    data = request.get_json()
    for idx, task_id in enumerate(data.get("order", [])):
        task = Task.query.get(task_id)
        if task:
            task.position = idx
    db.session.commit()
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)
