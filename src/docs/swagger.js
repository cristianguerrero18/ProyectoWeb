import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema Académico",
      version: "1.0.0",
      description: "Documentación completa del API REST del sistema académico",
      contact: {
        name: "Equipo de Desarrollo",
        email: "desarrollo@ejemplo.com"
      }
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Servidor de desarrollo"
      },
      {
        url: "https://api.sistemaacademico.com/api",
        description: "Servidor de producción"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Asignatura: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            nombre: {
              type: "string",
              example: "Matemáticas Básicas"
            },
            codigo: {
              type: "string",
              example: "MAT101"
            },
            creditos: {
              type: "integer",
              example: 3
            },
            horas_semanales: {
              type: "integer",
              example: 4
            },
            estado: {
              type: "boolean",
              example: true
            }
          }
        },
        Carrera: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            nombre: {
              type: "string",
              example: "Ingeniería de Sistemas"
            },
            id_tipo_carrera: {
              type: "integer",
              example: 1
            },
            duracion_semestres: {
              type: "integer",
              example: 10
            },
            descripcion: {
              type: "string",
              example: "Carrera enfocada en el desarrollo de software"
            },
            estado: {
              type: "boolean",
              example: true
            }
          }
        },
        Categoria: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            nombre: {
              type: "string",
              example: "Matemáticas"
            },
            descripcion: {
              type: "string",
              example: "Categoría para recursos de matemáticas"
            },
            estado: {
              type: "boolean",
              example: true
            },
            created_at: {
              type: "string",
              format: "date-time"
            }
          }
        },
        LogAcceso: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            id_usuario: {
              type: "integer",
              example: 1
            },
            tipo_evento: {
              type: "string",
              example: "login"
            },
            descripcion: {
              type: "string",
              example: "Inicio de sesión exitoso"
            },
            ip: {
              type: "string",
              example: "192.168.1.100"
            },
            created_at: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Notificacion: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            id_usuario: {
              type: "integer",
              example: 1
            },
            titulo: {
              type: "string",
              example: "Nuevo recurso disponible"
            },
            mensaje: {
              type: "string",
              example: "Se ha subido un nuevo recurso"
            },
            tipo: {
              type: "string",
              example: "info"
            },
            leido: {
              type: "boolean",
              example: false
            },
            created_at: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Pensum: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            id_carrera: {
              type: "integer",
              example: 1
            },
            id_asignatura: {
              type: "integer",
              example: 1
            },
            semestre: {
              type: "integer",
              example: 1
            },
            creditos: {
              type: "integer",
              example: 3
            },
            horas_teoria: {
              type: "integer",
              example: 2
            },
            horas_practica: {
              type: "integer",
              example: 2
            }
          }
        },
        PensumInput: {
          type: "object",
          required: ["id_carrera", "id_asignatura", "semestre"],
          properties: {
            id_carrera: {
              type: "integer",
              example: 1
            },
            id_asignatura: {
              type: "integer",
              example: 1
            },
            semestre: {
              type: "integer",
              example: 1
            },
            creditos: {
              type: "integer",
              example: 3
            }
          }
        },
        PQRS: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            id_usuario: {
              type: "integer",
              example: 1
            },
            id_tipo_pqr: {
              type: "integer",
              example: 1
            },
            asunto: {
              type: "string",
              example: "Problema con recurso"
            },
            descripcion: {
              type: "string",
              example: "No puedo descargar el archivo"
            },
            estado: {
              type: "string",
              example: "pendiente"
            },
            fecha_creacion: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Recurso: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            id_usuario: {
              type: "integer",
              example: 1
            },
            id_asignatura: {
              type: "integer",
              example: 1
            },
            titulo: {
              type: "string",
              example: "Apuntes de Matemáticas"
            },
            descripcion: {
              type: "string",
              example: "Resumen del primer parcial"
            },
            nombre_archivo: {
              type: "string",
              example: "apuntes_mat.pdf"
            },
            estado: {
              type: "string",
              example: "aprobado"
            },
            fecha_subida: {
              type: "string",
              format: "date-time"
            }
          }
        },
        RecursoDetalle: {
          type: "object",
          properties: {
            recurso: {
              $ref: '#/components/schemas/Recurso'
            },
            likes: {
              type: "integer",
              example: 15
            },
            dislikes: {
              type: "integer",
              example: 2
            },
            comentarios: {
              type: "array",
              items: {
                $ref: '#/components/schemas/Comentario'
              }
            }
          }
        },
        Reporte: {
          type: "object",
          properties: {
            id_reporte: {
              type: "integer",
              example: 1
            },
            id_usuario_reporta: {
              type: "integer",
              example: 1
            },
            id_recurso: {
              type: "integer",
              example: 1
            },
            tipo_reporte: {
              type: "string",
              enum: ["contenido_inapropiado", "spam", "derechos_autor", "otro"],
              example: "contenido_inapropiado"
            },
            descripcion: {
              type: "string",
              example: "Contenido ofensivo"
            },
            estado: {
              type: "string",
              enum: ["pendiente", "revisado", "resuelto"],
              example: "pendiente"
            },
            fecha_reporte: {
              type: "string",
              format: "date-time"
            }
          }
        },
        ReporteCompleto: {
          type: "object",
          properties: {
            reporte: {
              $ref: '#/components/schemas/Reporte'
            },
            usuario_reporta: {
              type: "object",
              properties: {
                id: {
                  type: "integer"
                },
                nombre: {
                  type: "string"
                },
                correo: {
                  type: "string"
                }
              }
            },
            recurso_reportado: {
              $ref: '#/components/schemas/Recurso'
            },
            acciones: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_admin: {
                    type: "integer"
                  },
                  accion: {
                    type: "string"
                  },
                  fecha: {
                    type: "string",
                    format: "date-time"
                  }
                }
              }
            }
          }
        },
        Rol: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            nombre: {
              type: "string",
              example: "Administrador"
            },
            descripcion: {
              type: "string",
              example: "Acceso total al sistema"
            },
            permisos: {
              type: "array",
              items: {
                type: "string"
              },
              example: ["crear_usuario", "eliminar_recurso", "aprobar_contenido"]
            },
            estado: {
              type: "boolean",
              example: true
            },
            created_at: {
              type: "string",
              format: "date-time"
            }
          }
        },
        TipoCarrera: {
          type: "object",
          properties: {
            id_tipo_carrera: {
              type: "integer",
              example: 1
            },
            nombre: {
              type: "string",
              example: "Pregrado"
            },
            descripcion: {
              type: "string",
              example: "Programas universitarios"
            },
            duracion_anios: {
              type: "integer",
              example: 5
            },
            nivel_academico: {
              type: "string",
              example: "Universitario"
            },
            estado: {
              type: "boolean",
              example: true
            },
            created_at: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            nombre: {
              type: "string",
              example: "Juan Pérez"
            },
            correo: {
              type: "string",
              format: "email",
              example: "juan@ejemplo.com"
            },
            id_rol: {
              type: "integer",
              example: 2
            },
            id_carrera: {
              type: "integer",
              example: 1
            },
            telefono: {
              type: "string",
              example: "3001234567"
            },
            estado: {
              type: "boolean",
              example: true
            },
            fecha_registro: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Comentario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            id_recurso: {
              type: "integer",
              example: 1
            },
            id_usuario: {
              type: "integer",
              example: 1
            },
            contenido: {
              type: "string",
              example: "Excelente recurso"
            },
            id_comentario_padre: {
              type: "integer",
              nullable: true,
              example: null
            },
            fecha_creacion: {
              type: "string",
              format: "date-time"
            },
            fecha_actualizacion: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Favorito: {
          type: "object",
          properties: {
            id_usuario: {
              type: "integer",
              example: 1
            },
            id_recurso: {
              type: "integer",
              example: 1
            },
            fecha_agregado: {
              type: "string",
              format: "date-time"
            }
          }
        },
        LikeRecurso: {
          type: "object",
          properties: {
            id_recurso: {
              type: "integer",
              example: 1
            },
            id_usuario: {
              type: "integer",
              example: 1
            },
            tipo: {
              type: "string",
              enum: ["like", "dislike"],
              example: "like"
            },
            fecha_voto: {
              type: "string",
              format: "date-time"
            }
          }
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            },
            usuario: {
              $ref: '#/components/schemas/Usuario'
            },
            expira_en: {
              type: "string",
              format: "date-time"
            }
          }
        },
        DashboardTotales: {
          type: "object",
          properties: {
            totalUsuarios: {
              type: "integer",
              example: 150
            },
            totalRecursos: {
              type: "integer",
              example: 500
            },
            totalCarreras: {
              type: "integer",
              example: 10
            },
            totalAsignaturas: {
              type: "integer",
              example: 80
            },
            recursosPendientes: {
              type: "integer",
              example: 25
            },
            reportesPendientes: {
              type: "integer",
              example: 5
            }
          }
        },
        DerechoAutor: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            titulo: {
              type: "string",
              example: "Libro de Matemáticas"
            },
            autor: {
              type: "string",
              example: "Juan Pérez"
            },
            descripcion: {
              type: "string",
              example: "Libro sobre matemáticas avanzadas"
            },
            fecha_registro: {
              type: "string",
              format: "date-time"
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Acceso no autorizado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "No autorizado"
                  },
                  message: {
                    type: "string",
                    example: "Token inválido o expirado"
                  }
                }
              }
            }
          }
        },
        NotFoundError: {
          description: "Recurso no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "No encontrado"
                  },
                  message: {
                    type: "string",
                    example: "El recurso solicitado no existe"
                  }
                }
              }
            }
          }
        },
        BadRequestError: {
          description: "Solicitud incorrecta",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Solicitud incorrecta"
                  },
                  message: {
                    type: "string",
                    example: "Los datos proporcionados son inválidos"
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: "Asignaturas",
        description: "Gestión de asignaturas académicas"
      },
      {
        name: "Carreras",
        description: "Gestión de carreras académicas"
      },
      {
        name: "Categorías",
        description: "Gestión de categorías del sistema"
      },
      {
        name: "Dashboard",
        description: "Estadísticas y métricas del sistema"
      },
      {
        name: "Derechos Autor",
        description: "Gestión de derechos de autor"
      },
      {
        name: "Logs de Acceso",
        description: "Registro y consulta de logs de acceso"
      },
      {
        name: "Notificaciones",
        description: "Gestión de notificaciones del sistema"
      },
      {
        name: "Pensum",
        description: "Gestión de pensum académico"
      },
      {
        name: "PQRS (Admin)",
        description: "Administración de PQRS"
      },
      {
        name: "PQRS (Usuario)",
        description: "PQRS para usuarios"
      },
      {
        name: "Recursos",
        description: "Gestión de recursos educativos"
      },
      {
        name: "Reportes",
        description: "Gestión de reportes de contenido"
      },
      {
        name: "Roles",
        description: "Gestión de roles de usuario"
      },
      {
        name: "Tipos de Carrera",
        description: "Gestión de tipos de carrera"
      },
      {
        name: "Usuarios (Admin)",
        description: "Gestión de usuarios (administración)"
      },
      {
        name: "Autenticación",
        description: "Login y recuperación de contraseña"
      },
      {
        name: "Comentarios",
        description: "Gestión de comentarios en recursos"
      },
      {
        name: "Favoritos",
        description: "Gestión de recursos favoritos"
      },
      {
        name: "Likes de Recursos",
        description: "Gestión de likes y dislikes"
      }
    ]
  },
  apis: ["./src/routes/**/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);